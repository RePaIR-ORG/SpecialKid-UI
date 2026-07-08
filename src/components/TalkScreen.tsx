import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TalkScreenProps {
  onBack: () => void;
}

export const TalkScreen: React.FC<TalkScreenProps> = ({ onBack }) => {
  const [isListening, setIsListening] = useState(true);

  const toggleListening = () => setIsListening((prev) => !prev);

  return (
    <div
      className="min-h-screen flex flex-col font-sans overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0f3ff 0%, #eaedf9 100%)',
        fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
      }}
    >
      {/* Top Navigation Bar */}
      <header
        className="flex justify-center items-center w-full px-6 py-4 fixed top-0 z-50"
        style={{
          background: 'rgba(249,249,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '3px solid #dfe2ee',
        }}
      >
        <div className="flex justify-between items-center w-full max-w-7xl">
          <button
            onClick={onBack}
            className="font-black text-2xl tracking-tighter cursor-pointer bg-transparent border-none flex items-center gap-2"
            style={{ color: '#2a2b51', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>arrow_back</span>
            Re<span style={{ color: '#4343d5' }}>Pa</span>IR<span style={{ color: '#4343d5' }}>.</span>
          </button>
          <div className="flex gap-8 items-center">
            <a
              href="#"
              className="font-bold text-base hover:opacity-70 transition-opacity flex items-center gap-1"
              style={{ color: '#464555' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>help_outline</span>
              Help
            </a>
            <a
              href="#"
              className="font-bold text-base hover:opacity-70 transition-opacity flex items-center gap-1"
              style={{ color: '#464555' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
              Exit
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="flex-grow flex flex-col items-center justify-center px-6 pb-12"
        style={{ paddingTop: '100px' }}
      >
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">

          {/* Left Column: Robot Mascot */}
          <motion.div
            className="flex items-center justify-center w-full md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative group">
              {/* Mascot card */}
              <div
                className="w-64 h-64 md:w-[420px] md:h-[420px] bg-white rounded-3xl p-6 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300"
                style={{ boxShadow: '0 12px 40px rgba(67,67,213,0.10)', border: '3px solid #e1e0ff' }}
              >
                {/* Robot SVG – listening pose */}
                <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                  {/* Body */}
                  <rect x="45" y="100" width="110" height="90" rx="22" fill="#5d5fef" />
                  {/* Head */}
                  <rect x="55" y="42" width="90" height="72" rx="20" fill="#4343d5" />
                  {/* Eyes */}
                  <circle cx="80" cy="72" r="13" fill="#fdd400" />
                  <circle cx="120" cy="72" r="13" fill="#fdd400" />
                  <circle cx="83" cy="70" r="5.5" fill="#221b00" />
                  <circle cx="123" cy="70" r="5.5" fill="#221b00" />
                  {/* Antenna */}
                  <line x1="100" y1="42" x2="100" y2="20" stroke="#c1c1ff" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="100" cy="14" r="8" fill="#fdd400" stroke="#221b00" strokeWidth="2.5" />
                  {/* Ear / hand near ear - listening pose */}
                  <rect x="10" y="105" width="35" height="18" rx="9" fill="#4343d5" />
                  <circle cx="13" cy="114" r="11" fill="#c1c1ff" />
                  {/* Other arm */}
                  <rect x="155" y="105" width="35" height="18" rx="9" fill="#4343d5" />
                  <circle cx="187" cy="114" r="11" fill="#c1c1ff" />
                  {/* Sound waves from ear */}
                  <path d="M 28 100 Q 20 108 28 116" stroke="#fdd400" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 20 95 Q 8 108 20 122" stroke="#fdd400" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
                  {/* Legs */}
                  <rect x="63" y="184" width="28" height="24" rx="9" fill="#2e2bc2" />
                  <rect x="109" y="184" width="28" height="24" rx="9" fill="#2e2bc2" />
                  {/* Chest speaker grille */}
                  <rect x="76" y="120" width="48" height="30" rx="10" fill="#6466f5" />
                  <circle cx="88" cy="135" r="4" fill="#c1c1ff" />
                  <circle cx="100" cy="135" r="4" fill="#c1c1ff" />
                  <circle cx="112" cy="135" r="4" fill="#c1c1ff" />
                  {/* Mouth - open, listening */}
                  <path d="M 78 95 Q 100 107 122 95" stroke="#fdd400" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              {/* Volume badge */}
              <div
                className="absolute -top-3 -right-3 p-3 rounded-full border-4"
                style={{ background: '#fdd400', borderColor: '#221b00' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '28px', color: '#221b00', fontVariationSettings: "'FILL' 1" }}
                >
                  volume_up
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interaction Controls */}
          <motion.div
            className="flex flex-col items-center justify-center w-full md:w-1/2 gap-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <h1
              className="font-black tracking-tight text-center"
              style={{
                color: '#171c24',
                fontSize: 'clamp(28px, 4vw, 42px)',
                lineHeight: 1.2,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              How is your <span style={{ color: '#4343d5' }}>mood</span> today?
            </h1>

            {/* Mic Button with Ripple Waves */}
            <div className="relative flex items-center justify-center">
              {/* Ripple rings – only visible when listening */}
              {isListening && (
                <>
                  <div
                    className="absolute rounded-full border-4"
                    style={{
                      width: '160px', height: '160px',
                      borderColor: '#5d5fef',
                      opacity: 0.25,
                      animation: 'talkRipple 2s cubic-bezier(0.4,0,0.6,1) infinite 0s',
                    }}
                  />
                  <div
                    className="absolute rounded-full border-4"
                    style={{
                      width: '200px', height: '200px',
                      borderColor: '#5d5fef',
                      opacity: 0.15,
                      animation: 'talkRipple 2s cubic-bezier(0.4,0,0.6,1) infinite 0.5s',
                    }}
                  />
                  <div
                    className="absolute rounded-full border-4"
                    style={{
                      width: '240px', height: '240px',
                      borderColor: '#5d5fef',
                      opacity: 0.08,
                      animation: 'talkRipple 2s cubic-bezier(0.4,0,0.6,1) infinite 1s',
                    }}
                  />
                </>
              )}

              {/* Mic button */}
              <motion.button
                onClick={toggleListening}
                className="relative w-32 h-32 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: isListening ? '#5d5fef' : '#767586',
                  borderBottom: `6px solid ${isListening ? '#2e2bc2' : '#3a3a4a'}`,
                  boxShadow: isListening ? '0 0 40px 10px rgba(93,95,239,0.22)' : 'none',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ y: 4 }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '64px',
                    color: '#ffffff',
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  mic
                </span>
              </motion.button>
            </div>

            {/* Status pill */}
            <div
              className="px-8 py-4 rounded-2xl border-4 shadow-sm w-full max-w-sm text-center"
              style={{ background: '#ffffff', borderColor: '#c7c4d7' }}
            >
              <p
                className="font-bold text-lg"
                style={{
                  color: '#4343d5',
                  animation: isListening ? 'statusPulse 1.5s ease-in-out infinite' : 'none',
                  fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
                }}
              >
                {isListening ? 'Listening ....' : 'Click to speak again'}
              </p>
            </div>

            {/* Alternative action */}
            <button
              className="flex items-center gap-2 font-bold text-base hover:underline transition-all active:scale-95"
              style={{ color: '#4343d5', fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}
            >
              I'd rather type my mood
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>keyboard</span>
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-8 gap-4"
        style={{ background: '#f0f3ff', borderTop: '3px solid #dfe2ee' }}
      >
        <div className="font-black text-xl" style={{ color: '#4343d5', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          RePaIR
        </div>
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
          <div className="font-bold text-sm opacity-60" style={{ color: '#705d00' }}>© 2026 RePaIR</div>
      </footer>

      <style>{`
        @keyframes talkRipple {
          0%  { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100%{ transform: scale(1.25); opacity: 0; }
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default TalkScreen;
