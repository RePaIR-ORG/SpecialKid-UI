import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, Loader2 } from 'lucide-react';

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
  const [tasks, setTasks]       = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const palette     = MOOD_ACCENT[moodId] ?? MOOD_ACCENT.happy;
  const emojiColor  = MOOD_EMOJI_COLOR[moodId] ?? '#fdd400';

  // ── Fetch ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
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

  // ── Slide helpers ─────────────────────────────────────────────────────────
  const currentTask = tasks[activeSlide] ?? null;

  const handleNext = () => {
    if (activeSlide < tasks.length - 1) {
      setActiveSlide((p) => p + 1);
    } else {
      onBack(); // finished all tasks
    }
  };

  const isLast    = activeSlide === tasks.length - 1;
  const isCompleted = currentTask?.status === 'Completed';

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full bg-[#f8f5ff] text-[#2a2b51]">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="flex w-full items-center justify-between px-6 py-6 sm:px-8">
        <div className="text-2xl font-black tracking-tight text-[#2962FF]">RePaIR</div>
        <div className="w-[80px]" />
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

        {/* ── Slideshow ───────────────────────────────────────────────────── */}
        {!isLoading && !error && tasks.length > 0 && currentTask && (
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
                        <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Done
                        </div>
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

                {/* Action button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex w-full max-w-md items-center justify-center rounded-full px-6 py-5 text-2xl font-black text-white transition-all hover:scale-[1.02] active:translate-y-1"
                  style={{
                    background: palette.accent,
                    boxShadow: `0 8px 0 ${palette.shadow}`,
                  }}
                >
                  {isLast ? '🎉 All Done!' : 'Next Task →'}
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="mt-8 flex gap-4">
              {tasks.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? 'w-8 shadow-[0_0_15px_rgba(41,98,255,0.4)]'
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
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default TasksForMoodScreen;
