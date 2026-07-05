import React from 'react';
import Lottie from 'lottie-react';
import moodRobotAnimation from '../assets/lottie/happy-robot.json';

interface MoodScreenProps {
  onBack: () => void;
  onShowHistory: () => void;
}

export const MoodScreen: React.FC<MoodScreenProps> = ({ onBack, onShowHistory }) => {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container overflow-hidden font-sans">
      {/* TopNavBar */}
      <header className="w-full top-0 z-50 bg-[#f8f5ff]/80 backdrop-blur-md flex justify-between items-center px-8 py-6 fixed">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <span className="font-black text-2xl tracking-tighter text-[#2a2b51]">
            RePaIR<span className="text-[#2962FF]">.</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[#575881] hover:opacity-80 transition-opacity active:scale-95 duration-200 cursor-pointer">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="text-[#575881] hover:opacity-80 transition-opacity active:scale-95 duration-200 cursor-pointer">
            <span className="material-symbols-outlined">help</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant">
            <img 
              alt="User Profile Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1-8xXu2ZbTKNN5K9hgC4lQ9NR0zBNrfrcZg9m4pP4e-iDLz3YYqvsdcOCH676B7xlZCJvF39-kQEuFcPmSvg4z7obOBuI08zztgPMgEoKpplnlJseDnCXzrsfV--FqAr7AhvQm_IQK-THR3omjpy0CoJnCE4iBrIPiNSKvVgTJ0ZO9FBlcqBrgUY3giC4JQ-mZ8jrr5hisxjfGkqQ7nxUqiD_jWxttEVd8iiRVkEq-1-LAY0BRTSR5MnYwwtPxUMF-elXnvudxTll"
            />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 relative overflow-hidden mt-20 mb-20">
        {/* Floating decorative blobs for kinetic feel */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary-container/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl"></div>

        {/* Hero Content Wrapper */}
        <div className="max-w-6xl w-full flex flex-col items-center justify-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-tight mb-12 md:mb-16 text-center">
            How is your <span className="text-primary">mood</span> today?
          </h1>

          {/* Interaction Zone */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {/* Character Illustration */}
            <div className="w-80 h-80 md:w-[500px] md:h-[500px] flex items-center justify-center">
              <Lottie 
                animationData={moodRobotAnimation} 
                loop={true} 
                className="w-full h-full"
              />
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col items-center">
              <button 
                className="group relative bg-primary text-on-primary text-3xl md:text-5xl font-black px-14 py-8 rounded-full bubble-shadow active:box-shadow-2 active:translate-y-1.5 transition-all duration-200 hover:scale-[1.05] flex items-center gap-4 cursor-pointer"
              >
                <span aria-label="happy emoji" className="text-4xl md:text-6xl" role="img">😊</span>
                Happy!
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center gap-12 items-center px-6 pb-8 pt-4 bg-white/80 backdrop-blur-xl shadow-[0_-10px_40px_rgba(42,43,81,0.1)] rounded-t-[3rem] border-t border-surface-container-highest">
        {/* Item 1: Mood */}
        <a 
          className="flex flex-col items-center justify-center bg-surface-variant text-primary rounded-full px-8 py-2 transition-all duration-300 active:translate-y-0.5" 
          href="#"
          onClick={(e) => { e.preventDefault(); }}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mood</span>
          <span className="text-[12px] font-semibold">Mood</span>
        </a>
        {/* Item 2: History */}
        <a 
          className="flex flex-col items-center justify-center text-on-surface-variant px-8 py-2 hover:bg-surface-container-low rounded-full transition-all duration-300 active:translate-y-0.5 pointer-events-auto cursor-pointer" 
          href="#"
          onClick={(e) => { e.preventDefault(); onShowHistory(); }}
        >
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[12px] font-semibold">History</span>
        </a>
      </nav>
    </div>
  );
};

export default MoodScreen;
