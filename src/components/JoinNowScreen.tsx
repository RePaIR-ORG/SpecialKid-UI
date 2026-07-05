import React from 'react';

interface JoinNowScreenProps {
  onBack: () => void;
}

export const JoinNowScreen: React.FC<JoinNowScreenProps> = ({ onBack }) => {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-between overflow-x-hidden selection:bg-secondary-container font-sans">
      <main className="w-full max-w-7xl px-6 flex-grow flex items-center justify-center relative py-8">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/20 blur-[100px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tertiary-fixed/20 blur-[100px] rounded-full -z-10"></div>

        {/* Registration Bento-Grid / Centered Layout */}
        <div className="w-full max-w-xl">
          {/* Main Card Container */}
          <div className="bg-surface-container-lowest p-8 md:p-16 rounded-[2.5rem] shadow-[0px_40px_60px_-10px_rgba(42,43,81,0.05)] relative overflow-visible border-2 border-[#dbd9ff]">
            
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="absolute -top-6 -left-6 bg-white p-3 rounded-full shadow-lg border border-[#dbd9ff] hover:scale-110 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>

            {/* Editorial Image Accent */}
            <div className="absolute -top-16 -right-8 hidden md:block w-32 h-32 transform rotate-12">
              <img 
                alt="Friendly 3D robot toy waving" 
                className="w-full h-full object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRzhshZlcVCu9lScviCAjr9qwLH9XkqGpkkiMLhmg32Y61GOctWIn2lu4v3WIBTopDL0PZBfJLf4AMv-9MXMtYu_foeesI5z-YdNDqOss08YhM3WoDprOwZ4OLP3zyBmfn5HRFSU3_HdXADxo1mHSL4hEe4d8FyTTR4qinCEq8DqIoaAwlEoglNq8ZJ0XL8A4vYeb9abfai_si5iW8DZAbildrmUj8WMmerN3Dud5ALrlAe4raLr_E7v0qIi2Jz4ujGORz-HIXjZCT"
              />
            </div>

            {/* Header Content */}
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
                Welcome! Set up Account
              </h1>
            </div>

            {/* Registration Form */}
            <form action="#" className="space-y-8" onClick={(e) => e.preventDefault()}>
              <div className="space-y-6">
                {/* Username Field */}
                <div className="group">
                  <label className="block text-sm font-bold text-on-surface-variant mb-3 ml-4" htmlFor="username">
                    Username
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-6 text-on-surface-variant group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <input 
                      className="w-full bg-surface-container-high border-none focus:ring-4 focus:ring-primary rounded-full py-5 pl-16 pr-8 text-on-surface font-medium placeholder:text-outline transition-all transition-duration-300" 
                      id="username" 
                      placeholder="Type a cool name..." 
                      type="text"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-sm font-bold text-on-surface-variant mb-3 ml-4" htmlFor="password">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-6 text-on-surface-variant group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                    <input 
                      className="w-full bg-surface-container-high border-none focus:ring-4 focus:ring-primary rounded-full py-5 pl-16 pr-8 text-on-surface font-medium placeholder:text-outline transition-all transition-duration-300" 
                      id="password" 
                      placeholder="Shhh... secret code!" 
                      type="password"
                    />
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="group w-full relative inline-flex items-center justify-center px-8 py-5 bg-primary text-on-primary font-extrabold text-xl rounded-full transition-transform active:translate-y-1 hover:-translate-y-0.5 shadow-[0px_4px_0px_0px_#0041c7] cursor-pointer">
                  <span className="flex items-center gap-2">
                    Let's Go!
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </span>
                </button>
              </div>

              {/* Subtext */}
              <div className="text-center pt-2">
                <p className="text-on-surface-variant text-sm font-medium tracking-wide">
                  Don't worry, you only have to do this once!
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full bg-transparent flex flex-col md:flex-row justify-between items-center px-12 py-8 w-full gap-4">
        <div className="text-[#575881] font-sans text-sm font-medium">© 2026 Secured</div>
        <div className="flex gap-8">
          <a className="text-[#575881] font-sans text-sm font-medium hover:text-primary transition-all opacity-80 hover:opacity-100" href="#">Privacy</a>
          <a className="text-[#575881] font-sans text-sm font-medium hover:text-primary transition-all opacity-80 hover:opacity-100" href="#">Terms</a>
          <a className="text-[#575881] font-sans text-sm font-medium hover:text-primary transition-all opacity-80 hover:opacity-100" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default JoinNowScreen;
