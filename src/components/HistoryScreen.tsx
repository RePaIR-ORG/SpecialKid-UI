import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lottie from 'lottie-react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import moodRobotAnimation from '../assets/lottie/happy-robot.json';

// ── Types ─────────────────────────────────────────────────────────────────────
type MoodKey = 'happy' | 'sad' | 'angry' | 'tired';

interface DayEntry {
  date: string;       // "YYYY-MM-DD"
  mood: MoodKey | null;
  createdAt: string | null;
}

interface HistoryScreenProps {
  token: string;
  onBackToMood: () => void;
}

// ── Mood metadata ─────────────────────────────────────────────────────────────
const MOOD_META: Record<MoodKey, { emoji: string; label: string; color: string; bg: string; icon: string }> = {
  happy: {
    emoji: '😊',
    label: 'Happy!',
    color: '#16a34a',
    bg: '#4ade80',
    icon: 'mood',
  },
  sad: {
    emoji: '😢',
    label: 'Sad',
    color: '#2563eb',
    bg: '#60a5fa',
    icon: 'sentiment_dissatisfied',
  },
  angry: {
    emoji: '😡',
    label: 'Angry',
    color: '#dc2626',
    bg: '#f87171',
    icon: 'mood_bad',
  },
  tired: {
    emoji: '🥱',
    label: 'Tired',
    color: '#7c3aed',
    bg: '#c4b5fd',
    icon: 'bedtime',
  },
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ── Short day labels ──────────────────────────────────────────────────────────
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return `${DAY_SHORT[d.getDay()]} ${day} ${MONTH_SHORT[month - 1]}`;
}

function isToday(iso: string) {
  return new Date().toISOString().slice(0, 10) === iso;
}

// ── Component ─────────────────────────────────────────────────────────────────
export const HistoryScreen: React.FC<HistoryScreenProps> = ({ token, onBackToMood }) => {
  const [history, setHistory] = useState<DayEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayEntry | null>(null);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/student-auth/mood-history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Could not load your mood history.');
      const data = await res.json();
      // data.history is [today, yesterday, …, 6 days ago] — reverse for chronological display
      setHistory([...data.history].reverse());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [token]);

  // Compute the "top vibe" — the mood with the most entries in the last 7 days
  const topVibe: MoodKey | null = (() => {
    const counts: Record<string, number> = {};
    for (const entry of history) {
      if (entry.mood) counts[entry.mood] = (counts[entry.mood] ?? 0) + 1;
    }
    if (!Object.keys(counts).length) return null;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as MoodKey;
  })();

  const topMeta = topVibe ? MOOD_META[topVibe] : null;

  return (
    <div className="bg-gradient-to-br from-[#fbfaff] via-[#f8f5ff] to-[#f4f0ff] text-[#2a2b51] min-h-screen flex flex-col relative font-sans overflow-x-hidden">

      {/* ── Top Nav ──────────────────────────────────────────────────────────── */}
      <nav className="flex justify-between items-center px-6 py-4 w-full bg-[#f8f5ff]/90 backdrop-blur sticky top-0 z-50 border-b border-[#e8e6ff]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMood}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white border border-[#dbd9ff] text-[#2a2b51] hover:scale-105 transition-transform cursor-pointer shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-2xl font-black text-[#2a2b51] tracking-tighter">My Mood History</div>
        </div>
        <button
          onClick={fetchHistory}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#dbd9ff] text-[#2a2b51] text-sm font-semibold hover:bg-[#f2efff] transition disabled:opacity-50 cursor-pointer"
          aria-label="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </nav>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 space-y-8 pt-8 pb-40 w-full flex flex-col items-center">

        {/* ── Hero: Top Vibe ─────────────────────────────────────────────────── */}
        <section className="relative w-full text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-[#2a2b51] leading-tight tracking-tighter">
            My Top Vibe This Week
          </h1>

          <div
            className="rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden w-full relative"
            style={{ background: 'rgba(219,217,255,0.2)' }}
          >
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#dbd9ff]/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#004be2]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 relative z-10">
              {/* Robot */}
              <div className="w-48 h-48 md:w-72 md:h-72 transform hover:scale-105 transition-transform duration-500">
                <Lottie animationData={moodRobotAnimation} loop className="w-full h-full" />
              </div>

              {/* Top vibe badge */}
              <div className="md:-ml-8 relative z-10">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-48 h-16 rounded-3xl bg-[#e8e6ff] animate-pulse"
                    />
                  ) : topMeta ? (
                    <motion.div
                      key={topVibe}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#2a2b51] text-2xl md:text-3xl font-black rounded-3xl border-2 border-[#dbd9ff] shadow-[0_8px_0_0_#dbd9ff]"
                    >
                      <span className="text-4xl">{topMeta.emoji}</span>
                      {topMeta.label}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#575881] text-xl font-semibold rounded-3xl border-2 border-[#dbd9ff]"
                    >
                      No moods yet 🤔
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── Error state ─────────────────────────────────────────────────────── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-2xl bg-red-50 border border-red-200 text-red-700 px-6 py-4 text-center font-semibold"
          >
            {error} —{' '}
            <button onClick={fetchHistory} className="underline font-bold cursor-pointer">try again</button>
          </motion.div>
        )}

        {/* ── 7-Day Timeline ──────────────────────────────────────────────────── */}
        <section className="space-y-4 flex flex-col items-center w-full">
          <h2 className="text-2xl font-black text-[#2a2b51] tracking-tight text-center">
            Tap a day to see your mood!
          </h2>

          {/* Day bubbles */}
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 md:gap-4 w-full pb-2">
            {isLoading
              ? Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 shrink-0"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#e8e6ff] animate-pulse" />
                    <div className="w-12 h-3 rounded bg-[#e8e6ff] animate-pulse" />
                  </div>
                ))
              : history.map((entry, idx) => {
                  const meta = entry.mood ? MOOD_META[entry.mood] : null;
                  const today = isToday(entry.date);
                  const isSelected = selectedDay?.date === entry.date;

                  return (
                    <motion.div
                      key={entry.date}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex flex-col items-center gap-2 shrink-0"
                    >
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDay(isSelected ? null : entry)}
                        className={`relative flex items-center justify-center rounded-full border-4 text-white transition-all cursor-pointer
                          ${today ? 'w-24 h-24 md:w-28 md:h-28' : 'w-20 h-20 md:w-24 md:h-24'}
                        `}
                        style={{
                          background: meta ? meta.bg : '#e8e6ff',
                          borderColor: isSelected ? '#004be2' : (meta ? meta.color : '#dbd9ff'),
                          boxShadow: today
                            ? `0 8px 0 0 ${meta ? meta.color : '#c0bdff'}`
                            : `0 4px 0 0 ${meta ? meta.color + '88' : '#c0bdff'}`,
                          color: meta ? '#fff' : '#9ca3af',
                        }}
                        aria-label={`${formatDate(entry.date)}: ${meta?.label ?? 'no mood recorded'}`}
                      >
                        {meta ? (
                          <span
                            className="material-symbols-outlined text-4xl select-none"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {meta.icon}
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-3xl text-[#9ca3af] select-none">
                            help_outline
                          </span>
                        )}
                        {today && (
                          <span className="absolute -top-2 -right-1 text-xs font-black bg-[#004be2] text-white px-2 py-0.5 rounded-full shadow">
                            Today
                          </span>
                        )}
                      </motion.button>

                      <div className="text-center">
                        <span className="block text-xs font-black uppercase tracking-widest text-[#575881]">
                          {formatDate(entry.date).split(' ')[0]}
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: meta ? meta.color : '#9ca3af' }}
                        >
                          {meta ? meta.emoji : '—'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
          </div>

          {/* ── Selected day detail card ─────────────────────────────────────── */}
          <AnimatePresence>
            {selectedDay && (
              <motion.div
                key={selectedDay.date}
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="w-full max-w-sm mx-auto rounded-3xl bg-white border-2 border-[#dbd9ff] shadow-[0_8px_0_0_#dbd9ff] p-6 flex flex-col items-center gap-3"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-[#575881]">
                  {formatDate(selectedDay.date)}
                  {isToday(selectedDay.date) ? ' · Today' : ''}
                </p>
                {selectedDay.mood ? (
                  <>
                    <span className="text-6xl">{MOOD_META[selectedDay.mood].emoji}</span>
                    <span
                      className="text-2xl font-black"
                      style={{ color: MOOD_META[selectedDay.mood].color }}
                    >
                      {MOOD_META[selectedDay.mood].label}
                    </span>
                    {selectedDay.createdAt && (
                      <p className="text-xs text-[#9ca3af]">
                        Logged at {new Date(selectedDay.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-[#575881] font-semibold">No mood recorded for this day.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Mood legend ─────────────────────────────────────────────────────── */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {(Object.entries(MOOD_META) as [MoodKey, typeof MOOD_META[MoodKey]][]).map(([key, m]) => (
              <div
                key={key}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{ background: m.bg + '33', color: m.color, border: `1.5px solid ${m.bg}` }}
              >
                <span>{m.emoji}</span>
                {m.label}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Bottom Nav ──────────────────────────────────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center px-4 pb-6 pt-2 bg-[#f8f5ff]/90 backdrop-blur-xl shadow-[0px_-4px_0px_0px_rgba(42,43,81,0.1)] rounded-t-[3rem] border-t-4 border-[#dbd9ff]">
        <div className="flex justify-around items-center w-full max-w-sm">
          <button
            onClick={onBackToMood}
            className="flex flex-col items-center justify-center rounded-full px-8 py-2 transition-all duration-300 active:translate-y-0.5 cursor-pointer hover:bg-[#f2efff]"
            style={{ color: '#575881' }}
          >
            <span className="material-symbols-outlined text-3xl">mood</span>
            <span className="text-[12px] font-semibold">Mood</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center rounded-full px-8 py-2 transition-all duration-300 cursor-pointer"
            style={{ background: '#dbd9ff', color: '#2962FF' }}
          >
            <span className="material-symbols-outlined text-3xl">calendar_month</span>
            <span className="text-[12px] font-semibold">History</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HistoryScreen;
