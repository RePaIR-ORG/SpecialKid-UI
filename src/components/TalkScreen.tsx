import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send } from 'lucide-react';
import Lottie from 'lottie-react';
import hearingRobotAnimation from '../../lotte files/hearing robot.json';

interface TalkScreenProps {
  onBack: () => void;
  onOpenLink: (link: 'help' | 'exit' | 'privacy-policy' | 'safety-center' | 'parents-guide') => void;
}

export const TalkScreen: React.FC<TalkScreenProps> = ({ onBack, onOpenLink }) => {
  const [isListening, setIsListening] = useState(true);
  const [showTextInput, setShowTextInput] = useState(false);
  const [typedMood, setTypedMood] = useState('');
  const [submittedMood, setSubmittedMood] = useState('');

  const toggleListening = () => setIsListening((prev) => !prev);

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
        className="flex justify-center items-center w-full px-6 py-4 fixed top-0 z-50"
        style={{
          background: '#f8f5ff',
          backdropFilter: 'blur(12px)',
          borderBottom: '3px solid #dfe2ee',
        }}
      >
        <div className="flex justify-between items-center w-full max-w-7xl">
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
          <div className="ml-auto flex gap-6 items-center">
            <button
              type="button"
              onClick={() => onOpenLink('help')}
              className="font-bold text-base hover:opacity-70 transition-opacity flex items-center gap-1"
              style={{ color: '#464555' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>help_outline</span>
              Help
            </button>
            <button
              type="button"
              onClick={() => onOpenLink('exit')}
              className="font-bold text-base hover:opacity-70 transition-opacity flex items-center gap-1"
              style={{ color: '#464555' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
              Exit
            </button>
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
                <Lottie
                  animationData={hearingRobotAnimation}
                  loop
                  autoplay
                  className="w-full h-full"
                />
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
              className="font-black tracking-tight text-center whitespace-nowrap"
              style={{
                color: '#171c24',
                fontSize: 'clamp(22px, 3.2vw, 38px)',
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
            {!showTextInput ? (
              <button
                type="button"
                onClick={() => setShowTextInput(true)}
                className="flex items-center gap-2 font-bold text-base hover:underline transition-all active:scale-95"
                style={{ color: '#4343d5', fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}
              >
                I'd rather type my mood
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>keyboard</span>
              </button>
            ) : (
              <div className="w-full max-w-sm rounded-[1.5rem] border border-[#dfe2ee] bg-[#f8f5ff] p-4 shadow-sm">
                <label className="mb-2 block text-sm font-semibold text-[#4343d5]" htmlFor="talk-mood-input">
                  Type your mood
                </label>
                <textarea
                  id="talk-mood-input"
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
        style={{ background: '#f8f5ff', borderTop: '3px solid #dfe2ee' }}
> 
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
