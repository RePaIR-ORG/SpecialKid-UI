import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lottie from 'lottie-react';
import { ArrowLeft } from 'lucide-react';
import moodRobotAnimation from '../assets/lottie/happy-robot.json';
import sadRobotAnimation from '../../lotte files/sad robot lotte.json';
import angryRobotAnimation from '../../lotte files/angry robot lotte.json';
import tiredRobotAnimation from '../../lotte files/tired robot lotte.json';

interface MoodScreenProps {
  onBack: () => void;
  onShowHistory: () => void;
  onOpenLink: (link: 'settings' | 'help' | 'profile') => void;
  onMoodSelect?: (moodId: string) => void;
}

// ─── Mood data ────────────────────────────────────────────────────────────────
interface MoodConfig {
  id: string;
  label: string;
  emoji: string;
  bg: string;
  blob1: string;
  blob2: string;
  btnBg: string;
  btnText: string;
  btnShadow: string;
  btnBorder: string;
  accentText: string;
  btnBorderBottom?: string;
  angryGlow?: boolean;
}

const MOODS: MoodConfig[] = [
  {
    id: 'happy',
    label: 'Happy!',
    emoji: '😊',
    bg: '#ffffff',
    blob1: 'rgba(128,155,255,0.18)',
    blob2: 'rgba(253,212,0,0.08)',
    btnBg: '#004be2',
    btnText: '#f2f1ff',
    btnShadow: '#002376',
    btnBorder: 'rgba(255,255,255,0.15)',
    accentText: '#004be2',
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😢',
    bg: '#ffffff',
    blob1: 'rgba(128,155,255,0.10)',
    blob2: 'rgba(191,220,255,0.24)',
    btnBg: '#d9ebff',
    btnText: '#2a2b51',
    btnShadow: '#7aa8ff',
    btnBorder: 'transparent',
    btnBorderBottom: '8px solid #7aa8ff',
    accentText: '#004be2',
  },
  {
    id: 'angry',
    label: 'Angry',
    emoji: '😡',
    bg: '#ffffff',
    blob1: 'rgba(128,155,255,0.10)',
    blob2: 'rgba(253,212,0,0.05)',
    btnBg: '#004be2',
    btnText: '#ffffff',
    btnShadow: '#002376',
    btnBorder: 'rgba(255,255,255,0.2)',
    accentText: '#004be2',
    angryGlow: true,
  },
  {
    id: 'tired',
    label: 'Tired',
    emoji: '🥱',
    bg: '#ffffff',
    blob1: 'rgba(214,233,255,0.48)',
    blob2: 'rgba(128,155,255,0.08)',
    btnBg: '#d1e6ff',
    btnText: '#2a2b51',
    btnShadow: '#8eb4ff',
    btnBorder: '#8eb4ff',
    accentText: '#004be2',
  },
] as const;

// ─── Shared SVG robot illustrations ──────────────────────────────────────────

/** Happy slide: uses the lottie animation already in the project */
const HappyRobot: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Lottie animationData={moodRobotAnimation} loop className="w-full h-full robot-cutout happy-robot-cutout" />
  </div>
);

/** Sad slide: uses the sad lottie from lotte files */
const SadRobot: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Lottie animationData={sadRobotAnimation} loop className="w-full h-full robot-cutout happy-robot-cutout" />
  </div>
);

/** Angry slide: uses the angry lottie from lotte files */
const AngryRobot: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Lottie animationData={angryRobotAnimation} loop className="w-full h-full robot-cutout happy-robot-cutout" />
  </div>
);

/** Tired slide: uses the tired lottie from lotte files */
const TiredRobot: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Lottie animationData={tiredRobotAnimation} loop className="w-full h-full robot-cutout happy-robot-cutout" />
  </div>
);

const ROBOT_COMPONENTS = [HappyRobot, SadRobot, AngryRobot, TiredRobot];

// ─── Carousel slide directions ────────────────────────────────────────────────
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

// ─── Component ────────────────────────────────────────────────────────────────
export const MoodScreen: React.FC<MoodScreenProps> = ({ onBack, onShowHistory, onOpenLink, onMoodSelect }) => {
  const [[activeIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const dragStartX = useRef<number>(0);

  const navigate = (newIndex: number) => {
    const dir = newIndex > activeIndex ? 1 : -1;
    const clamped = Math.max(0, Math.min(MOODS.length - 1, newIndex));
    setPage([clamped, dir]);
  };

  const handleDragStart = (_: unknown, info: { point: { x: number } }) => {
    dragStartX.current = info.point.x;
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -60 && activeIndex < MOODS.length - 1) navigate(activeIndex + 1);
    else if (info.offset.x > 60 && activeIndex > 0) navigate(activeIndex - 1);
  };

  const mood = MOODS[activeIndex];
  const RobotEl = ROBOT_COMPONENTS[activeIndex];

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden font-sans"
      style={{ background: mood.bg, transition: 'background 0.4s ease', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── Top Nav ─────────────────────────────────────────────────────────── */}
      <header
        className="w-full fixed top-0 z-50 flex justify-between items-center px-8 py-5"
        style={{ background: '#f8f5ff', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-3 select-none">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white border border-[#dbd9ff] text-[#2a2b51] hover:scale-105 transition-transform cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-black text-2xl tracking-tighter" style={{ color: '#2a2b51' }}>
            RePaIR
          </span>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => onOpenLink('help')} className="hover:opacity-70 transition-opacity active:scale-95 cursor-pointer" style={{ color: '#575881' }} aria-label="Help">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 relative overflow-hidden mt-20 mb-24">
        {/* Decorative blobs */}
        <div
          className="absolute top-[-8%] left-[-8%] w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: mood.blob1 }}
        />
        <div
          className="absolute bottom-[20%] right-[-5%] w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: mood.blob2 }}
        />

        {/* Title */}
        <h1
          className="font-extrabold tracking-tight leading-tight text-center relative z-10 mb-10"
          style={{ color: '#2a2b51', fontSize: 'clamp(2rem, 6vw, 4rem)' }}
        >
          How is your <span style={{ color: mood.accentText }}>mood</span> today?
        </h1>

        {/* Carousel viewport */}
        <div className="relative w-full max-w-5xl overflow-hidden" style={{ minHeight: '420px' }}>

          {/* Prev arrow */}
          {activeIndex > 0 && (
            <button
              onClick={() => navigate(activeIndex - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform"
              style={{ background: 'rgba(219,217,255,0.8)', color: '#004be2' }}
              aria-label="Previous mood"
            >
              <span className="material-symbols-outlined text-3xl">chevron_left</span>
            </button>
          )}

          {/* Next arrow */}
          {activeIndex < MOODS.length - 1 && (
            <button
              onClick={() => navigate(activeIndex + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform"
              style={{ background: 'rgba(219,217,255,0.8)', color: '#004be2' }}
              aria-label="Next mood"
            >
              <span className="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
          )}

          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-14 cursor-grab active:cursor-grabbing select-none"
              style={{ minHeight: '400px' }}
            >
              {/* Robot illustration */}
              <div
                className="relative group flex-shrink-0"
                style={{ width: 'clamp(220px, 35vw, 380px)', height: 'clamp(220px, 35vw, 380px)' }}
              >
                {/* Mood-specific ambient glow */}
                {mood.id === 'happy' && (
                  <div
                    className="absolute -inset-6 rounded-full blur-3xl opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity duration-700"
                    style={{ background: mood.blob1 }}
                  />
                )}
                <div className="relative w-full h-full z-10">
                  <RobotEl />
                </div>
              </div>

              {/* Mood action button */}
              <div className="flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97, y: 4 }}
                  onClick={() => onMoodSelect?.(mood.id)}
                  className="relative flex items-center gap-4 px-12 py-7 rounded-full font-black overflow-hidden cursor-pointer"
                  style={{
                    background: mood.btnBg,
                    color: mood.btnText,
                    fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
                    boxShadow: `0 8px 0px ${mood.btnShadow}${mood.angryGlow ? ', 0 20px 50px -15px rgba(41,98,255,0.3)' : ''}`,
                    border: mood.btnBorderBottom ? 'none' : `4px solid ${mood.btnBorder}`,
                    borderBottom: mood.btnBorderBottom ?? undefined,
                  }}
                >
                  {/* Inner shine overlay for angry */}
                  {mood.id === 'angry' && (
                    <div
                      className="absolute top-2 left-6 right-6 h-3 rounded-full blur-sm pointer-events-none"
                      style={{ background: 'rgba(255,255,255,0.18)' }}
                    />
                  )}
                  {/* Tired shimmer overlay */}
                  {mood.id === 'tired' && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'rgba(128,155,255,0.10)' }}
                    />
                  )}
                  <span className="text-5xl md:text-6xl" role="img" aria-label={mood.label + ' emoji'}>
                    {mood.emoji}
                  </span>
                  <span className="relative z-10">{mood.label}</span>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dot indicators ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mt-8 z-10">
          {MOODS.map((m, i) => (
            <button
              key={m.id}
              onClick={() => navigate(i)}
              aria-label={`Go to ${m.label} slide`}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === activeIndex ? '32px' : '10px',
                height: '10px',
                background: i === activeIndex ? '#004be2' : '#dbd9ff',
              }}
            />
          ))}
        </div>

        {/* Swipe hint */}
        <p className="mt-4 text-sm font-medium opacity-40 select-none" style={{ color: '#575881' }}>
          ← swipe or tap arrows to explore moods →
        </p>
      </main>

      {/* ── Bottom Nav ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed bottom-0 left-0 w-full z-50 flex justify-center gap-12 items-center px-6 pb-8 pt-4 rounded-t-[3rem] border-t"
        style={{
          background: '#f8f5ff',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 -10px 40px rgba(42,43,81,0.08)',
          borderColor: 'rgba(219,217,255,0.6)',
        }}
      >
        <a
          href="#"
          className="flex flex-col items-center justify-center rounded-full px-8 py-2 transition-all duration-300 active:translate-y-0.5"
          style={{ background: '#dbd9ff', color: '#2962FF' }}
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mood</span>
          <span className="text-[12px] font-semibold">Mood</span>
        </a>
        <button
          type="button"
          className="flex flex-col items-center justify-center rounded-full px-8 py-2 transition-all duration-300 cursor-pointer hover:bg-[#f2efff]"
          style={{ color: '#575881' }}
          onClick={onShowHistory}
        >
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[12px] font-semibold">History</span>
        </button>
      </nav>

      <style>{`
        .robot-cutout {
          background: transparent !important;
          mix-blend-mode: multiply;
          isolation: isolate;
        }

        .happy-robot-cutout {
          background: transparent !important;
          mix-blend-mode: normal !important;
          filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
        }

        .happy-robot-cutout svg,
        .happy-robot-cutout > svg {
          background: transparent !important;
          filter: none !important;
          box-shadow: none !important;
          border: 0 !important;
        }

        @keyframes tiredSway {
          0%, 100% { transform: rotate(-1deg); }
          50%       { transform: rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default MoodScreen;
