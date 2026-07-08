/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lottie from 'lottie-react';
import { 
  Star, 
  ArrowRight, 
  Sparkles, 
  Sprout, 
  Smile, 
  Heart, 
  Sparkle,
  MessageCircle,
  X
} from 'lucide-react';
import wavingRobotAnimation from '../lotte files/waving robot.json';
import MoodScreen from './components/MoodScreen';
import JoinNowScreen from './components/JoinNowScreen';
import HistoryScreen from './components/HistoryScreen';
import MultimodalScreen from './components/MultimodalScreen';
import TalkScreen from './components/TalkScreen';
import CaptureScreen from './components/CaptureScreen';

type InfoLink =
  | 'privacy-policy'
  | 'safety-center'
  | 'terms'
  | 'support'
  | 'parents-guide'
  | 'help'
  | 'settings'
  | 'profile';

const INFO_MESSAGES: Record<InfoLink, string> = {
  'privacy-policy': 'Privacy Policy: RePaIR uses your taps and mood choices to personalize the experience inside the app. It is designed to stay simple and child-friendly.',
  'safety-center': 'Safety Center: Use RePaIR with a trusted adult nearby. If something feels wrong or confusing, tap Exit and ask for help.',
  terms: 'Terms: RePaIR is meant for respectful, supervised use. Please follow your school or family guidance while using the app.',
  support: 'Support: Ask a teacher, parent, caregiver, or school helper if you need assistance using RePaIR.',
  'parents-guide': 'Parents\' Guide: This app helps children notice feelings, choose support options, and move through the experience with simple navigation.',
  help: 'Help: Use the top links to learn more. Exit returns you to the opening screen, and the mood cards let you move through the experience.',
  settings: 'Settings: This area would normally control accessibility, sound, and comfort preferences.',
  profile: 'Student Profile: This area would normally show the student identity and saved preferences.',
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'multimodal' | 'mood' | 'talk' | 'capture' | 'join-now' | 'history'>('landing');
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isWaving, setIsWaving] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
  };

  const openInfoLink = (link: InfoLink) => {
    window.alert(INFO_MESSAGES[link]);
  };

  const moods = [
    { name: 'Amazing', icon: Smile, color: 'bg-emerald-100 text-emerald-600 border-emerald-300' },
    { name: 'Good', icon: Sparkle, color: 'bg-blue-100 text-blue-600 border-blue-300' },
    { name: 'Tired', icon: Heart, color: 'bg-amber-100 text-amber-600 border-amber-300' },
    { name: 'Anxious', icon: MessageCircle, color: 'bg-purple-100 text-purple-600 border-purple-300' },
  ];

  if (currentView === 'multimodal') {
    return (
      <MultimodalScreen
        onBack={() => setCurrentView('landing')}
        onJustTap={() => setCurrentView('mood')}
        onTalkToMe={() => setCurrentView('talk')}
        onSeeMe={() => setCurrentView('capture')}
        onOpenLink={(link) => {
          if (link === 'exit') {
            setCurrentView('landing');
            return;
          }
          openInfoLink(link as InfoLink);
        }}
      />
    );
  }

  if (currentView === 'talk') {
    return <TalkScreen onBack={() => setCurrentView('multimodal')} onOpenLink={(link) => {
      if (link === 'exit') {
        setCurrentView('landing');
        return;
      }
      openInfoLink(link as InfoLink);
    }} />;
  }

  if (currentView === 'capture') {
    return <CaptureScreen onBack={() => setCurrentView('multimodal')} onOpenLink={(link) => {
      if (link === 'exit') {
        setCurrentView('landing');
        return;
      }
      openInfoLink(link as InfoLink);
    }} />;
  }

  if (currentView === 'mood') {
    return (
      <MoodScreen 
        onBack={() => setCurrentView('multimodal')} 
        onShowHistory={() => setCurrentView('history')}
        onOpenLink={(link) => openInfoLink(link as InfoLink)}
      />
    );
  }

  if (currentView === 'history') {
    return <HistoryScreen onBackToMood={() => setCurrentView('mood')} />;
  }

  if (currentView === 'join-now') {
    return <JoinNowScreen onBack={() => setCurrentView('landing')} onOpenLink={(link) => openInfoLink(link as InfoLink)} />;
  }

  return (
    <div className="bg-gradient-to-br from-[#fbfaff] via-[#f8f5ff] to-[#f4f0ff] text-[#2a2b51] min-h-screen flex flex-col font-sans overflow-x-hidden relative selection:bg-[#2962FF] selection:text-white">
      
      {/* Top Header */}
      <header className="w-full z-40 bg-white/45 backdrop-blur-md border-b-2 border-[#f2efff]">
        <div className="flex justify-between items-center w-full px-8 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 select-none -ml-2">
            <span className="font-black text-2xl tracking-tighter text-[#2a2b51]">
              RePaIR
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center py-12 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full gap-12 lg:gap-24 relative">
        
        {/* Left Side: Waving Robot Card Container */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <motion.div 
            className="relative w-full max-w-md aspect-square bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(42,43,81,0.06)] border border-[#dbd9ff]/30 flex items-center justify-center overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Subtle radial yellow glow behind the card on hover */}
            <div className="absolute inset-0 bg-[#fdd400]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
            
            {/* Embedded waving robot animation */}
            <motion.div
              className="w-full h-full relative z-10 rounded-[2rem] overflow-hidden"
              animate={isWaving ? {
                rotate: [0, -3, 3, -3, 3, 0],
                y: [0, -6, 2, -6, 0]
              } : {
                y: [0, -8, 0]
              }}
              transition={isWaving ? {
                duration: 1.5,
                ease: "easeInOut"
              } : {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Lottie
                animationData={wavingRobotAnimation}
                loop
                autoplay
                className="w-full h-full select-none pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Text & CTA Button Container */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:text-left">
          <div className="relative max-w-xl">
            
            {/* Decorative Yellow Star Accent Tilted */}
            <motion.div 
              className="absolute -top-12 -right-6 md:-right-8 w-14 h-14 bg-[#FDD400] rounded-full border-4 border-[#433700] flex items-center justify-center shadow-[0_4px_0_0_#433700] select-none cursor-pointer"
              style={{ rotate: 12 }}
              whileHover={{ rotate: 25, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWaving(true)}
            >
              <Star className="w-6 h-6 text-[#433700] fill-[#433700]" />
            </motion.div>

            {/* Main Page Title */}
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-[#2a2b51] mb-8 leading-tight whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Start Your Day
            </motion.h1>

            {/* Interactive Section for 'How Are You Today' and Join Now */}
            <motion.div 
              className="flex flex-col gap-6 items-center lg:items-start w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {/* Electric Blue Tactile Button */}
              <motion.button 
                onClick={() => {
                  setCurrentView('multimodal');
                }}
                  className="tactile-button w-full max-w-md mx-auto bg-[#2962FF] hover:bg-[#1a52ef] text-white py-6 px-10 md:py-7 md:px-12 rounded-full font-black text-2xl md:text-3xl tracking-tight shadow-[0_8px_0_0_#0033b3] cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                How Are You Today?
              </motion.button>

              {/* Join Now Link with animated hover Arrow */}
              <button 
                onClick={() => setCurrentView('join-now')}
                className="text-[#575881] font-extrabold text-lg flex items-center gap-2 group hover:text-[#2962FF] transition-colors focus:outline-none cursor-pointer mt-2"
              >
                <span>Join Now</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </button>
            </motion.div>

          </div>
        </div>

      </main>

      {/* Mood Checker Drawer/Modal Interaction */}
      <AnimatePresence>
        {showMoodCheck && (
          <motion.div 
            className="fixed inset-0 bg-[#2a2b51]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative border-2 border-[#dbd9ff]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <button 
                onClick={() => setShowMoodCheck(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-[#575881]"
              >
                <X className="w-5 h-5" />
              </button>

              {!selectedMood ? (
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-[#2a2b51] mb-3">How Are You Today?</h3>
                  <p className="text-[#575881] font-medium text-sm mb-6">Select a feeling below to let your RePaIR companion know how to guide you.</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {moods.map((mood) => {
                      const IconComponent = mood.icon;
                      return (
                        <button
                          key={mood.name}
                          onClick={() => handleMoodSelect(mood.name)}
                          className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-transparent hover:border-gray-300 transition-all cursor-pointer ${mood.color} hover:scale-105`}
                        >
                          <IconComponent className="w-8 h-8 mb-2" />
                          <span className="font-extrabold text-sm uppercase tracking-wide">{mood.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#2962FF]"
                  >
                    <Smile className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-3xl font-black tracking-tight text-[#2a2b51] mb-2">Awesome!</h3>
                  <p className="text-[#575881] font-medium mb-6">
                    Thank you for sharing! Your RePaIR companion is waving back to brighten your day.
                  </p>
                  <button
                    onClick={() => setShowMoodCheck(false)}
                    className="bg-[#2962FF] text-white py-3 px-8 rounded-full font-bold hover:bg-[#1a52ef] transition-colors shadow-md cursor-pointer text-sm"
                  >
                    Back to Opening Page
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Lavender Footer */}
      <footer className="w-full rounded-t-[2.5rem] bg-[#f2efff] mt-auto select-none">
        <div className="bg-[#dbd9ff] h-[4px] w-full"></div>
        <div className="flex flex-col items-center justify-center px-8 py-10 w-full">
          <div className="flex flex-wrap justify-center items-center gap-4 text-[#575881] font-black text-xs uppercase tracking-widest">
            <span>© 2026</span>
            <span className="text-[#dbd9ff]">|</span>
              <button type="button" className="hover:text-[#2962FF] transition-colors cursor-pointer" onClick={() => openInfoLink('privacy-policy')}>Privacy Policy</button>
            <span className="text-[#dbd9ff]">|</span>
              <button type="button" className="hover:text-[#2962FF] transition-colors cursor-pointer" onClick={() => openInfoLink('safety-center')}>Safety Center</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
