import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, Loader2, PartyPopper } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Task {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  mood?: string;
}

interface TasksForMoodScreenProps {
  moodId: string;       // 'happy' | 'sad' | 'angry' | 'tired'
  moodLabel: string;    // Display name e.g. "Happy"
  moodEmoji: string;    // e.g. "😊"
  token: string;        // Student JWT
  onBack: () => void;
}

// ─── Mood accent colours ───────────────────────────────────────────────────────

const MOOD_ACCENT: Record<string, { accent: string; shadow: string; cardBorder: string; cardClassName: string }> = {
  happy:  { accent: '#2962FF', shadow: '#0038aa', cardBorder: 'border-[#fdd400]',   cardClassName: 'border-[#fdd400] bg-[#fffdf0]'   },
  sad:    { accent: '#2962FF', shadow: '#0038aa', cardBorder: 'border-[#90caf9]',   cardClassName: 'border-[#90caf9] bg-[#f0f7ff]'   },
  angry:  { accent: '#d32f2f', shadow: '#7f0000', cardBorder: 'border-[#ef9a9a]',   cardClassName: 'border-[#ef9a9a] bg-[#fff5f5]'   },
  tired:  { accent: '#5c6bc0', shadow: '#26418f', cardBorder: 'border-[#c5cae9]',   cardClassName: 'border-[#c5cae9] bg-[#f3f4fb]'   },
};

const MOOD_EMOJI_COLOR: Record<string, string> = {
  happy: '#fdd400',
  sad:   '#90caf9',
  angry: '#ef5350',
  tired: '#9fa8da',
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function speak(text: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TasksForMoodScreen: React.FC<TasksForMoodScreenProps> = ({
  moodId,
  moodLabel,
  moodEmoji,
  token,
  onBack,
}) => {
  const [tasks, setTasks]           = useState<Task[]>([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Per-task completing state so we can disable the button while the PATCH fires
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);

  // Celebration overlay when all tasks in the list are done
  const [allDone, setAllDone] = useState(false);

  const palette    = MOOD_ACCENT[moodId] ?? MOOD_ACCENT.happy;
  const emojiColor = MOOD_EMOJI_COLOR[moodId] ?? '#fdd400';

  // ── Fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      setAllDone(false);
      try {
        const res = await fetch(
          `${API_BASE}/student-auth/tasks?mood=${encodeURIComponent(moodId)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error('Could not load tasks.');
        const data = await res.json();
        setTasks(data.tasks ?? []);
        setActiveSlide(0);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [moodId, token]);

  // ── Mark task as Done ─────────────────────────────────────────────────────
  const handleMarkDone = useCallback(async () => {
    const currentTask = tasks[activeSlide];
    if (!currentTask || currentTask.status === 'Completed') return;

    setCompleting(true);
    setCompleteError(null);
    try {
      const res = await fetch(
        `${API_BASE}/student-auth/tasks/${currentTask._id}/complete`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || 'Could not mark task as done.');
      }

      // Optimistically update local state so the badge flips immediately
      setTasks((prev) =>
        prev.map((t) =>
          t._id === currentTask._id ? { ...t, status: 'Completed' } : t
        )
      );
    } catch (err: unknown) {
      setCompleteError(err instanceof Error ? err.message : 'Error completing task.');
    } finally {
      setCompleting(false);
    }
  }, [tasks, activeSlide, token]);

  // ── Navigate to next task ─────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    setCompleteError(null);
    if (activeSlide < tasks.length - 1) {
      setActiveSlide((p) => p + 1);
    } else {
      // Reached the last card — show celebration if every task is now Completed
      const allCompleted = tasks.every((t) =>
        t._id === tasks[activeSlide]._id ? true : t.status === 'Completed'
      );
      if (allCompleted) {
        setAllDone(true);
      } else {
        onBack();
      }
    }
  }, [activeSlide, tasks, onBack]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const currentTask  = tasks[activeSlide] ?? null;
  const isCompleted  = currentTask?.status === 'Completed';
  const isLast       = activeSlide === tasks.length - 1;
  const doneCount    = tasks.filter((t) => t.status === 'Completed').length;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full bg-[#f8f5ff] text-[#2a2b51]">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="flex w-full items-center justify-between px-6 py-6 sm:px-8">
        <div className="text-2xl font-black tracking-tight text-[#2962FF]">RePaIR</div>
        {/* Overall progress pill */}
        {tasks.length > 0 && (
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-white shadow"
            style={{ background: palette.accent }}
          >
            <CheckCircle2 className="h-4 w-4" />
            {doneCount} / {tasks.length} Done
          </div>
        )}
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl flex-col items-center px-4 pb-16 sm:px-6 lg:px-8">

        {/* Title */}
        <h1 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#2a2b51] sm:text-5xl">
          Today I feel{' '}
          <span style={{ color: emojiColor }} className="drop-shadow-sm">
            {moodLabel}
          </span>
          {' '}{moodEmoji}
        </h1>

        {/* ── Loading ─────────────────────────────────────────────────────── */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2
              className="h-12 w-12 animate-spin"
              style={{ color: palette.accent }}
            />
            <p className="text-sm font-semibold text-[#575881]">Loading your tasks…</p>
          </div>
        )}

        {/* ── Error ───────────────────────────────────────────────────────── */}
        {!isLoading && error && (
          <div className="rounded-2xl border border-[#ffcdd2] bg-[#fff5f5] p-8 text-center">
            <p className="font-bold text-lg mb-1 text-[#b71c1c]">Oops! Something went wrong.</p>
            <p className="text-sm text-[#c62828]">{error}</p>
          </div>
        )}

        {/* ── Empty ───────────────────────────────────────────────────────── */}
        {!isLoading && !error && tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-5 text-center"
          >
            <span className="text-8xl">🎉</span>
            <p className="text-2xl font-black text-[#2a2b51]">No tasks for this mood yet!</p>
            <p className="text-sm font-medium text-[#575881]">Your specialist will add tasks here soon.</p>
            <button
              type="button"
              onClick={onBack}
              className="mt-4 flex items-center justify-center rounded-full px-8 py-4 text-xl font-black text-white shadow-[0_8px_0_#0038aa] transition-all hover:scale-[1.02] active:translate-y-1"
              style={{ background: palette.accent, boxShadow: `0 8px 0 ${palette.shadow}` }}
            >
              Go Back
            </button>
          </motion.div>
        )}

        {/* ── All-Done Celebration ─────────────────────────────────────────── */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex flex-col items-center justify-center py-16 gap-6 text-center"
          >
            <span className="text-[96px] leading-none">🎊</span>
            <p className="text-4xl font-black text-[#2a2b51]">Amazing work!</p>
            <p className="text-lg font-semibold text-[#575881]">
              You completed all {tasks.length} task{tasks.length !== 1 ? 's' : ''}!
            </p>
            <div className="flex items-center gap-3 rounded-full bg-green-100 px-6 py-3 text-green-700 font-bold text-lg">
              <CheckCircle2 className="h-6 w-6" />
              Your specialist can see your progress!
            </div>
            <button
              type="button"
              onClick={onBack}
              className="mt-2 flex items-center justify-center gap-2 rounded-full px-10 py-5 text-2xl font-black text-white transition-all hover:scale-[1.02] active:translate-y-1"
              style={{ background: palette.accent, boxShadow: `0 8px 0 ${palette.shadow}` }}
            >
              <PartyPopper className="h-7 w-7" />
              Go Back to Moods
            </button>
          </motion.div>
        )}

        {/* ── Slideshow ───────────────────────────────────────────────────── */}
        {!isLoading && !error && tasks.length > 0 && currentTask && !allDone && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTask._id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative mx-auto flex w-full max-w-5xl flex-col items-center rounded-[1.25rem] bg-white p-8 shadow-[0_20px_60px_rgba(42,43,81,0.08)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(42,43,81,0.12)] sm:p-10 md:p-12"
              >
                {/* Card header: title + audio button */}
                <div className="mb-8 flex items-center gap-4 sm:gap-6">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-[#2a2b51] sm:text-4xl md:text-5xl">
                    {currentTask.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => speak(currentTask.title + (currentTask.description ? '. ' + currentTask.description : ''))}
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-white shadow-[0_8px_0_#0038aa] transition-all hover:scale-105 active:translate-y-1"
                    style={{ background: palette.accent, boxShadow: `0 8px 0 ${palette.shadow}` }}
                    aria-label="Play audio"
                  >
                    <span className="material-symbols-outlined text-3xl">volume_up</span>
                  </button>
                </div>

                {/* Image / placeholder area */}
                <div className={`mb-10 flex w-full items-center justify-center overflow-hidden rounded-[1rem] border-4 p-4 sm:p-6 ${palette.cardClassName}`}>
                  <div className="relative w-full max-w-3xl flex items-center justify-center min-h-[220px]">
                    {currentTask.imageUrl ? (
                      <img
                        alt={currentTask.title}
                        className="h-full w-full max-h-72 object-contain p-2 sm:p-4"
                        src={currentTask.imageUrl}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3 py-10 opacity-40">
                        <span className="text-7xl">{moodEmoji}</span>
                        <span className="text-sm font-semibold text-[#2a2b51]">No image for this task</span>
                      </div>
                    )}

                    {/* Status badge overlay */}
                    <div className="absolute top-2 right-2">
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-sm font-bold text-green-700 shadow"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Done! ✓
                        </motion.div>
                      ) : (
                        <div
                          className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                          style={{ background: palette.accent + '1a', color: palette.accent }}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          {currentTask.status}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description (if any) */}
                {currentTask.description && (
                  <p className="mb-8 text-center text-base leading-relaxed text-[#464555] max-w-lg">
                    {currentTask.description}
                  </p>
                )}

                {/* ── Complete error ── */}
                {completeError && (
                  <p className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 text-center">
                    {completeError}
                  </p>
                )}

                {/* ── Action buttons ── */}
                <div className="flex w-full max-w-md flex-col gap-4">

                  {/* Mark as Done button — shown only if not yet completed */}
                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={handleMarkDone}
                      disabled={completing}
                      className="flex w-full items-center justify-center gap-3 rounded-full px-6 py-5 text-xl font-black text-white transition-all hover:scale-[1.02] active:translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: '#16a34a',
                        boxShadow: '0 8px 0 #14532d',
                      }}
                    >
                      {completing ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin" />
                          Saving…
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-6 w-6" />
                          I Did It! ✓
                        </>
                      )}
                    </button>
                  )}

                  {/* Next / Finish button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex w-full items-center justify-center rounded-full px-6 py-4 text-lg font-black transition-all hover:scale-[1.02] active:translate-y-1"
                    style={
                      isCompleted
                        ? { background: palette.accent, color: '#fff', boxShadow: `0 8px 0 ${palette.shadow}` }
                        : { background: 'transparent', color: palette.accent, border: `3px solid ${palette.accent}` }
                    }
                  >
                    {isLast ? '🎉 Finish!' : 'Next Task →'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="mt-8 flex gap-4">
              {tasks.map((t, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? 'w-8 shadow-[0_0_15px_rgba(41,98,255,0.4)]'
                      : t.status === 'Completed'
                      ? 'w-3 bg-green-400'
                      : 'w-3 bg-[#dbd9ff]'
                  }`}
                  style={activeSlide === index ? { background: palette.accent } : {}}
                  aria-label={`Go to task ${index + 1}`}
                />
              ))}
            </div>

            {/* Task counter */}
            <p className="mt-4 text-sm font-semibold text-[#575881]">
              Task {activeSlide + 1} of {tasks.length}
              {doneCount > 0 && (
                <span className="ml-2 text-green-600">· {doneCount} completed</span>
              )}
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default TasksForMoodScreen;
