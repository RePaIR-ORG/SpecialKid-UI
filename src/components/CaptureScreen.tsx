import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Lottie from 'lottie-react';
import { ArrowLeft, Send } from 'lucide-react';
import seeMeRobotAnimation from '../../lotte files/see me robot animated.json';

interface CaptureScreenProps {
  onBack: () => void;
  onOpenLink: (link: 'help' | 'exit' | 'privacy-policy' | 'safety-center' | 'parents-guide') => void;
}

const STATUS_MESSAGES = [
  'Finding your smile...',
  'Analyzing the magic...',
  'Almost there!',
  'You look wonderful!',
];

export const CaptureScreen: React.FC<CaptureScreenProps> = ({ onBack, onOpenLink }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [statusVisible, setStatusVisible] = useState(true);
  const [showTextInput, setShowTextInput] = useState(false);
  const [typedMood, setTypedMood] = useState('');
  const [submittedMood, setSubmittedMood] = useState('');

  // Cycle through status messages with a fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusVisible(false);
      setTimeout(() => {
        setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
        setStatusVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans overflow-x-hidden"
      style={{
        background: '#ffffff',
        fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
      }}
    >
      {/* Top Navigation Bar */}
      <header
        className="flex justify-center items-center w-full px-6 py-3 sticky top-0 z-50"
        style={{
          background: '#f8f5ff',
          borderBottom: '4px solid #dfe2ee',
        }}
      >
        <div className="flex justify-between items-center w-full max-w-7xl">
          {/* Logo / back */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white border border-[#dbd9ff] text-[#2a2b51] hover:scale-105 transition-transform cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onBack}
              className="font-black text-2xl tracking-tighter cursor-pointer bg-transparent border-none flex items-center gap-2"
              style={{ color: '#2a2b51', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              RePaIR
            </button>
          </div>

          {/* Nav links (desktop) */}
          <nav className="hidden md:flex gap-6 items-center ml-auto">
            <button type="button" onClick={() => onOpenLink('help')} className="font-bold text-base hover:opacity-70 transition-opacity" style={{ color: '#464555' }}>Help</button>
            <button type="button" onClick={() => onOpenLink('exit')} className="font-bold text-base hover:opacity-70 transition-opacity" style={{ color: '#464555' }}>Exit</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-16">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left: Character / Camera Card */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div
              className="bg-white rounded-3xl p-6 md:p-8 relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-300"
              style={{
                borderBottom: '6px solid #dfe2ee',
                boxShadow: '0 12px 40px rgba(86,249,249,0.12)',
              }}
            >
              {/* See-me robot animation */}
              <div className="aspect-square w-full flex items-center justify-center">
                <Lottie
                  animationData={seeMeRobotAnimation}
                  loop
                  autoplay
                  className="w-full h-full max-h-96 drop-shadow-xl"
                />
              </div>

              {/* Decorative blur blob */}
              <div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl"
                style={{ background: '#c1c1ff', opacity: 0.2 }}
              />
            </div>
          </motion.div>

          {/* Right: Interface Controls */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <h1
              className="font-black tracking-tight w-full text-center"
              style={{
                color: '#4343d5',
                fontSize: 'clamp(28px, 4.5vw, 44px)',
                lineHeight: 1.2,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Look at me!
            </h1>

            {/* Viewfinder */}
            <div className="relative flex flex-col items-center gap-6 w-full">
              <div
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  border: '12px solid #26dcdd',
                  background: '#f0f3ff',
                  boxShadow: '0 0 40px rgba(86,249,249,0.3)',
                  animation: 'viewfinderPulse 3s infinite ease-in-out',
                }}
              >
                {/* Face placeholder icon */}
                <div className="flex flex-col items-center justify-center" style={{ color: '#767586' }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '110px', opacity: 0.35, fontVariationSettings: "'FILL' 0" }}
                  >
                    face
                  </span>
                </div>
                {/* Dashed inner ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '2px dashed #56f9f9',
                    opacity: 0.35,
                    transform: 'scale(0.88)',
                  }}
                />
                {/* Scanning sweep */}
                <div
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: '50%',
                    background: 'linear-gradient(to bottom, rgba(38,220,221,0.18), transparent)',
                    animation: 'scanBounce 3s infinite',
                  }}
                />
              </div>

              {/* Status pill */}
              <div
                className="px-8 py-3 rounded-full shadow-md flex items-center gap-3 border-2"
                style={{ background: '#ffffff', borderColor: '#c1c1ff' }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: '#006465', animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }}
                />
                <span
                  className="font-bold text-base transition-opacity duration-300"
                  style={{
                    color: '#171c24',
                    fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
                    opacity: statusVisible ? 1 : 0,
                  }}
                >
                  {STATUS_MESSAGES[statusIndex]}
                </span>
              </div>
            </div>

            {/* Alternative action */}
            {!showTextInput ? (
              <button
                type="button"
                onClick={() => setShowTextInput(true)}
                className="mt-2 flex items-center gap-2 font-bold text-base hover:underline transition-all active:scale-95 decoration-2 underline-offset-4"
                style={{ color: '#4343d5', fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>
                  keyboard
                </span>
                I'd rather type my mood
              </button>
            ) : (
              <div className="mt-2 w-full max-w-sm rounded-[1.5rem] border border-[#dfe2ee] bg-[#f8f5ff] p-4 shadow-sm">
                <label className="mb-2 block text-sm font-semibold text-[#4343d5]" htmlFor="capture-mood-input">
                  Type your mood
                </label>
                <textarea
                  id="capture-mood-input"
                  value={typedMood}
                  onChange={(event) => setTypedMood(event.target.value)}
                  placeholder="I feel calm, excited, tired..."
                  className="min-h-24 w-full rounded-[1rem] border border-[#c7c4d7] bg-white px-4 py-3 text-base text-[#171c24] outline-none focus:border-[#4343d5]"
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedMood(typedMood.trim());
                      setTypedMood('');
                      setShowTextInput(false);
                    }}
                    className="flex items-center gap-2 rounded-full bg-[#4343d5] px-4 py-2 text-sm font-semibold text-white"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTextInput(false)}
                    className="text-sm font-semibold text-[#575881]"
                  >
                    Cancel
                  </button>
                </div>
                {submittedMood && (
                  <p className="mt-3 text-sm font-semibold text-[#2a2b51]">You shared: {submittedMood}</p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="flex flex-col md:flex-row justify-between items-center w-full px-6 py-8 gap-4"
        style={{ background: '#f0f3ff', borderTop: '4px solid #dfe2ee' }}
> 
        <div className="font-bold text-sm" style={{ color: '#464555', opacity: 0.7 }}>© 2026 RePaIR</div>
      </footer>

      <style>{`
        @keyframes viewfinderPulse {
          0%, 100% { transform: scale(1);    opacity: 1;    }
          50%       { transform: scale(1.02); opacity: 0.88; }
        }
        @keyframes scanBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(60%); }
        }
        @keyframes ping {
          0%   { transform: scale(1);   opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CaptureScreen;
