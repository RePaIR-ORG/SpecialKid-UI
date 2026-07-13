import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Clock, ImageOff, Loader2 } from 'lucide-react';

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
  moodLabel: string;    // Display name e.g. "Happy!"
  moodEmoji: string;    // e.g. "😊"
  token: string;        // Student JWT
  onBack: () => void;
}

// ─── Mood colour palette (matches MoodScreen) ─────────────────────────────────

const MOOD_PALETTE: Record<string, { accent: string; bg: string; badge: string; badgeText: string }> = {
  happy: { accent: '#004be2', bg: '#f8f5ff', badge: '#dbd9ff', badgeText: '#2a2b51' },
  sad: { accent: '#2962FF', bg: '#f0f7ff', badge: '#d9ebff', badgeText: '#2a2b51' },
  angry: { accent: '#d32f2f', bg: '#fff5f5', badge: '#ffcdd2', badgeText: '#b71c1c' },
  tired: { accent: '#5c6bc0', bg: '#f3f4fb', badge: '#c5cae9', badgeText: '#283593' },
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ─── Component ────────────────────────────────────────────────────────────────

export const TasksForMoodScreen: React.FC<TasksForMoodScreenProps> = ({
  moodId,
  moodLabel,
  moodEmoji,
  token,
  onBack,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const palette = MOOD_PALETTE[moodId] ?? MOOD_PALETTE.happy;

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
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [moodId, token]);

  const statusIcon = (status: Task['status']) =>
    status === 'Completed' ? (
      <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: '#16a34a' }} />
    ) : (
      <Clock className="h-5 w-5 flex-shrink-0" style={{ color: palette.accent }} />
    );

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ background: palette.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className="w-full fixed top-0 z-50 flex justify-between items-center px-6 py-4 border-b"
        style={{ background: '#f8f5ff', borderColor: 'rgba(219,217,255,0.6)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:bg-[#f2efff]"
          style={{ borderColor: '#dbd9ff', color: '#2a2b51' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-2">
          <span className="text-2xl">{moodEmoji}</span>
          <span className="font-black text-xl" style={{ color: palette.accent }}>
            {moodLabel} Tasks
          </span>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 pt-28 pb-12 max-w-3xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-black mb-2 text-center"
          style={{ color: '#2a2b51' }}
        >
          Today's Tasks
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          className="text-center text-sm mb-8 font-semibold"
          style={{ color: '#575881' }}
        >
          Feeling {moodLabel} — here's what to do!
        </motion.p>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-10 w-10 animate-spin" style={{ color: palette.accent }} />
            <p className="text-sm font-semibold" style={{ color: '#575881' }}>
              Loading your tasks…
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div
            className="rounded-2xl border p-6 text-center"
            style={{ borderColor: '#ffcdd2', background: '#fff5f5' }}
          >
            <p className="font-bold text-lg mb-1" style={{ color: '#b71c1c' }}>
              Oops! Something went wrong.
            </p>
            <p className="text-sm" style={{ color: '#c62828' }}>
              {error}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center gap-5"
          >
            <span className="text-7xl">🎉</span>
            <p className="text-2xl font-black" style={{ color: '#2a2b51' }}>
              No tasks for this mood yet!
            </p>
            <p className="text-sm font-medium" style={{ color: '#575881' }}>
              Your specialist will add tasks here soon.
            </p>
          </motion.div>
        )}

        {/* Task list */}
        {!isLoading && !error && tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15 } }}
            className="space-y-4"
          >
            {tasks.map((task, i) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07 } }}
                className="rounded-2xl border bg-white shadow-sm overflow-hidden"
                style={{ borderColor: 'rgba(219,217,255,0.7)' }}
              >
                {/* Task image */}
                {task.imageUrl && (
                  <div className="w-full h-40 sm:h-52 overflow-hidden bg-gray-50">
                    <img
                      src={task.imageUrl}
                      alt={task.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Task header */}
                <button
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                  onClick={() => setExpandedId(expandedId === task._id ? null : task._id)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {statusIcon(task.status)}
                    <span
                      className="font-black text-lg leading-tight truncate"
                      style={{ color: '#2a2b51' }}
                    >
                      {task.title}
                    </span>
                  </div>
                  {/* Status badge */}
                  <span
                    className="flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: palette.badge, color: palette.badgeText }}
                  >
                    {task.status}
                  </span>
                </button>

                {/* Expanded description */}
                <AnimatePresence>
                  {expandedId === task._id && task.description && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-5 pt-1 text-base leading-relaxed border-t"
                        style={{ color: '#464555', borderColor: 'rgba(219,217,255,0.5)' }}
                      >
                        {task.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default TasksForMoodScreen;
