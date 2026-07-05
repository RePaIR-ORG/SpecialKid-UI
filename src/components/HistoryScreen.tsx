import React from 'react';
import Lottie from 'lottie-react';
import moodRobotAnimation from '../assets/lottie/happy-robot.json';

interface HistoryScreenProps {
  onBackToMood: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBackToMood }) => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative font-sans">
      {/* TopAppBar */}
      <nav className="flex justify-between items-center px-6 py-4 w-full bg-[#f8f5ff] sticky top-0 z-50">
        <div className="text-2xl font-black text-[#2962FF] tracking-tighter">History</div>
        <div className="flex gap-4 items-center">
            <button 
                onClick={onBackToMood}
                className="text-[#575881] hover:text-[#2962FF] transition-colors cursor-pointer"
            >
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
      </nav>

      <main className="flex-grow max-w-4xl mx-auto px-6 space-y-8 pt-8 pb-40 w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-black text-on-surface leading-tight tracking-tighter mx-auto max-w-2xl">
            My Top Vibe This Week
          </h1>
          <div className="bg-primary-container/20 rounded-xl p-8 flex flex-col items-center justify-center overflow-hidden w-full relative">
            {/* Background Decorative Blobs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-container/40 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {/* Star-eyed Robot Image */}
              <div className="w-64 h-64 md:w-96 md:h-96 relative transform hover:scale-105 transition-transform duration-500">
                <Lottie 
                  animationData={moodRobotAnimation} 
                  loop={true} 
                  className="w-full h-full"
                />
              </div>
              {/* Vibe Button */}
              <div className="md:-ml-12 relative z-10">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-2xl md:text-4xl font-black rounded-full shadow-lg transform hover:scale-110 transition-transform cursor-default">
                  Happy! 😊
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Mood Row: Interactive Circle Grid */}
        <section className="space-y-4 flex flex-col items-center w-full mt-12">
          <h2 className="text-2xl font-black text-on-surface tracking-tight text-center mb-4">
            Tap a day to see your mood!
          </h2>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-6 overflow-x-auto pb-4 w-full">
            {/* Monday */}
            <div className="flex flex-col items-center space-y-3 shrink-0">
              <button className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-green-400 border-4 border-on-primary-container flex items-center justify-center text-white shadow-[0px_8px_0px_0px_#0041c7] translate-y-[-4px] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>mood</span>
              </button>
              <div className="text-center">
                <span className="block text-xs font-black uppercase tracking-widest text-on-surface-variant">Mon</span>
                <span className="text-sm font-bold text-primary">Happy</span>
              </div>
            </div>
            
            {/* Tuesday */}
            <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-400 border-4 border-on-primary-container flex items-center justify-center text-white shadow-[0px_4px_0px_0px_rgba(42,43,81,0.2)] hover:translate-y-[-2px] transition-all cursor-pointer">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>sentiment_dissatisfied</span>
            </button>
            
            {/* Wednesday */}
            <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-400 border-4 border-on-primary-container flex items-center justify-center text-white shadow-[0px_4px_0px_0px_rgba(42,43,81,0.2)] hover:translate-y-[-2px] transition-all cursor-pointer">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>mood_bad</span>
            </button>
            
            {/* Thursday */}
            <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E0B0FF] border-4 border-on-primary-container flex items-center justify-center text-white shadow-[0px_4px_0px_0px_rgba(42,43,81,0.2)] hover:translate-y-[-2px] transition-all cursor-pointer">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
            </button>
            
            {/* Friday */}
            <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-400 border-4 border-on-primary-container flex items-center justify-center text-white shadow-[0px_4px_0px_0px_rgba(42,43,81,0.2)] hover:translate-y-[-2px] transition-all cursor-pointer">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>sentiment_very_satisfied</span>
            </button>
            
            {/* Saturday */}
            <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary-container border-4 border-on-primary-container flex items-center justify-center text-on-secondary-container shadow-[0px_4px_0px_0px_rgba(42,43,81,0.2)] hover:translate-y-[-2px] transition-all cursor-pointer">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
            </button>
            
            {/* Sunday */}
            <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-400 border-4 border-on-primary-container flex items-center justify-center text-white shadow-[0px_4px_0px_0px_rgba(42,43,81,0.2)] hover:translate-y-[-2px] transition-all cursor-pointer">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>mood</span>
            </button>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center px-4 pb-6 pt-2 bg-white/80 backdrop-blur-xl shadow-[0px_-4px_0px_0px_rgba(42,43,81,0.1)] rounded-t-[3rem] border-t-4 border-primary">
        <div className="flex justify-around items-center w-full max-w-sm">
          {/* Mood */}
          <button 
            onClick={onBackToMood}
            className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-3xl">mood</span>
            <span className="font-bold text-[10px] uppercase tracking-widest mt-1">Mood</span>
          </button>
          {/* History (Active) */}
          <div className="flex flex-col items-center justify-center bg-primary text-white rounded-full p-4 shadow-[0px_4px_0px_#004be2] translate-y-[-12px] transition-transform">
            <span className="material-symbols-outlined text-3xl">history</span>
            <span className="font-bold text-[10px] uppercase tracking-widest mt-1">History</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HistoryScreen;
