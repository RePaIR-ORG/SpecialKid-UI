import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Lottie from 'lottie-react';
import wavingRobotAnimation from '../../lotte files/waving robot.json';

interface MultimodalScreenProps {
  onBack: () => void;
  onJustTap: () => void;
  onTalkToMe: () => void;
  onSeeMe: () => void;
}

export const MultimodalScreen: React.FC<MultimodalScreenProps> = ({ onBack, onJustTap, onTalkToMe, onSeeMe }) => {
  const mascotRef = useRef<HTMLDivElement>(null);

  // Mouse-tracking tilt effect for the mascot robot
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current) return;
      const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
      mascotRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0f3ff 0%, #e1e0ff 100%)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Top Navigation Bar */}
      <nav
        className="flex justify-center items-center w-full px-6 py-4 fixed top-0 z-50"
        style={{
          background: 'rgba(249,249,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '3px solid #dfe2ee',
        }}
      >
        <div className="flex justify-between items-center w-full max-w-7xl">
          {/* Logo / back */}
          <button
            onClick={onBack}
            className="font-black text-2xl tracking-tighter cursor-pointer bg-transparent border-none"
            style={{ color: '#2a2b51' }}
          >
            RePaIR
          </button>

          <div className="hidden md:flex gap-8">
            <a
              href="#"
              className="font-bold text-base hover:opacity-70 transition-opacity"
              style={{ color: '#464555', fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}
            >
              Help
            </a>
            <a
              href="#"
              className="font-bold text-base hover:opacity-70 transition-opacity"
              style={{ color: '#464555', fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}
            >
              Exit
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pb-12" style={{ paddingTop: '100px' }}>
        {/* Header Section */}
        <motion.header
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1
            className="font-black tracking-tight mb-6"
            style={{
              color: '#4343d5',
              fontSize: 'clamp(28px, 5vw, 44px)',
              lineHeight: 1.2,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Choose Your Superpower!
          </h1>

          {/* Floating Mascot */}
          <div className="flex flex-col items-center">
            <div
              ref={mascotRef}
              className="w-44 h-44 md:w-52 md:h-52"
              style={{
                transition: 'transform 0.1s ease',
                animation: 'mascotFloat 3s ease-in-out infinite',
              }}
            >
              <Lottie
                animationData={wavingRobotAnimation}
                loop
                autoplay
                className="w-full h-full drop-shadow-xl"
              />
            </div>
          </div>
        </motion.header>

        {/* Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

          {/* Card 1: Just Tap! */}
          <motion.button
            onClick={onJustTap}
            className="flex flex-col items-center justify-between p-10 rounded-3xl cursor-pointer group"
            style={{
              background: '#fdd400',
              borderBottom: '6px solid #b79b00',
              minHeight: '300px',
              boxShadow: '0 8px 32px rgba(253,212,0,0.25)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(253,212,0,0.4)' }}
            whileTap={{ y: 4, boxShadow: 'none' }}
          >
            <div className="flex-grow flex items-center justify-center">
              <div
                className="p-6 rounded-full group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(255,255,255,0.35)' }}
              >
                {/* Touch/Tap icon */}
                <svg width="90" height="90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 11.5V6.5a1.5 1.5 0 0 1 3 0v5m0 0V5.5a1.5 1.5 0 0 1 3 0v6m0 0V8.5a1.5 1.5 0 0 1 3 0v5.5c0 3.314-2.686 6-6 6s-6-2.686-6-6v-2a1.5 1.5 0 0 1 3 0"
                    stroke="#705d00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <span
              className="w-full text-center font-black text-2xl md:text-3xl"
              style={{ color: '#221b00', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Just Tap!
            </span>
          </motion.button>

          {/* Card 2: Talk to Me! */}
          <motion.button
            onClick={onTalkToMe}
            className="flex flex-col items-center justify-between p-10 rounded-3xl cursor-pointer group relative overflow-hidden"
            style={{
              background: '#5d5fef',
              borderBottom: '6px solid #2e2bc2',
              minHeight: '300px',
              boxShadow: '0 8px 32px rgba(67,67,213,0.25)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(67,67,213,0.4)' }}
            whileTap={{ y: 4, boxShadow: 'none' }}
          >
            {/* Ripple decorations */}
            <div
              className="absolute rounded-full"
              style={{
                width: '120px',
                height: '120px',
                background: 'rgba(255,255,255,0.12)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -70%)',
                animation: 'ripplePulse 2s infinite',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '160px',
                height: '160px',
                background: 'rgba(255,255,255,0.07)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -70%)',
                animation: 'ripplePulse 2s infinite 0.5s',
              }}
            />
            <div className="flex-grow flex items-center justify-center relative z-10">
              <div
                className="p-6 rounded-full group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                {/* Mic icon */}
                <svg width="90" height="90" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path
                    d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <span
              className="w-full text-center font-black text-2xl md:text-3xl relative z-10"
              style={{ color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Talk to Me!
            </span>
          </motion.button>

          {/* Card 3: See Me! */}
          <motion.button
            onClick={onSeeMe}
            className="flex flex-col items-center justify-between p-10 rounded-3xl cursor-pointer group relative overflow-hidden"
            style={{
              background: '#56f9f9',
              borderBottom: '6px solid #004f50',
              minHeight: '300px',
              boxShadow: '0 8px 32px rgba(0,100,101,0.2)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(0,100,101,0.35)' }}
            whileTap={{ y: 4, boxShadow: 'none' }}
          >
            {/* Star sparkle decoration */}
            <div
              className="absolute top-10 left-1/2 -translate-x-1/2 opacity-30 select-none pointer-events-none"
              style={{ fontSize: '120px', color: '#fdd400', lineHeight: 1 }}
            >
              ✦
            </div>
            <div className="flex-grow flex items-center justify-center relative z-10">
              <div
                className="p-6 rounded-full group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(255,255,255,0.35)' }}
              >
                {/* Camera icon */}
                <svg width="90" height="90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                    stroke="#004f50"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="rgba(255,255,255,0.5)"
                  />
                  <circle cx="12" cy="13" r="4" stroke="#004f50" strokeWidth="2" fill="rgba(0,79,80,0.2)" />
                </svg>
              </div>
            </div>
            <span
              className="w-full text-center font-black text-2xl md:text-3xl relative z-10"
              style={{ color: '#002020', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              See Me!
            </span>
          </motion.button>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-8 gap-4 mt-auto"
        style={{
          background: '#f0f3ff',
          borderTop: '3px solid #dfe2ee',
        }}
      >
        <div className="flex flex-wrap justify-center gap-8">
          {['Privacy Policy', 'Safety Center', "Parents' Guide"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-bold text-base hover:opacity-70 transition-all active:scale-95"
              style={{ color: '#464555', fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="font-bold text-sm opacity-60" style={{ color: '#705d00' }}>
          © 2026 RePaIR
        </div>
      </footer>

      {/* Keyframe animations */}
      <style>{`
        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes ripplePulse {
          0% { transform: translate(-50%, -70%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -70%) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default MultimodalScreen;
