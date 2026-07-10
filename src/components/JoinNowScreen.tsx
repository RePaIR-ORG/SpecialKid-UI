/**
 * LoginScreen — Student login for SpecialKid-UI
 * Replaces the old "JoinNowScreen" placeholder with a fully functional
 * login form that calls POST /api/student-auth/login on the backend.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lottie from 'lottie-react';
import { ArrowLeft, Eye, EyeOff, Rocket, AlertCircle, CheckCircle2 } from 'lucide-react';
import wavingRobotAnimation from '../../lotte files/waving robot.json';

interface LoginScreenProps {
  onBack: () => void;
  onOpenLink: (link: 'privacy-policy' | 'terms' | 'support') => void;
<<<<<<< Updated upstream
  onLetsGo: () => void;
}

export const JoinNowScreen: React.FC<JoinNowScreenProps> = ({ onBack, onOpenLink, onLetsGo }) => {
=======
  onLogin: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onOpenLink,
  onLogin,
  isLoading,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Please enter your username.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      setSuccess(false);
      await onLogin(username, password);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again!');
    }
  };

>>>>>>> Stashed changes
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-between overflow-x-hidden selection:bg-secondary-container font-sans">
      {/* Header */}
      <header className="w-full px-6 md:px-12 pt-6 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white border border-[#dbd9ff] text-[#2a2b51] hover:scale-105 transition-transform cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="font-black text-2xl tracking-tighter text-[#2a2b51] select-none">
            RePaIR
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl px-6 flex-grow flex items-center justify-center relative py-8">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/20 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tertiary-fixed/20 blur-[100px] rounded-full -z-10" />

        <div className="w-full max-w-xl">
          <motion.div
            className="bg-surface-container-lowest p-8 md:p-14 rounded-[2.5rem] shadow-[0px_40px_60px_-10px_rgba(42,43,81,0.08)] relative overflow-visible border-2 border-[#dbd9ff]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Waving robot accent */}
            <div className="absolute -top-16 -right-8 hidden md:block w-32 h-32 transform rotate-12 pointer-events-none">
              <Lottie animationData={wavingRobotAnimation} loop autoplay className="w-full h-full object-contain" />
            </div>

            {/* Title section */}
            <div className="mb-8">
              <motion.div
                className="inline-flex items-center gap-2 bg-[#FDD400]/20 border border-[#FDD400]/50 text-[#594a00] rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest mb-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <span className="w-2 h-2 rounded-full bg-[#FDD400] animate-pulse inline-block" />
                Student Login
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hey there! 👋
                <br />
                <span className="text-primary">Let's get started</span>
              </motion.h1>
              <p className="text-on-surface-variant text-sm font-medium mt-3">
                Sign in with the credentials your specialist gave you.
              </p>
            </div>

            {/* Alert Banner */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error"
                  className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 mb-6 text-sm font-semibold"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  key="success"
                  className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 mb-6 text-sm font-semibold"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Welcome! Taking you in…</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Username Field */}
              <div className="group">
                <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-4" htmlFor="sk-username">
                  Username
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-5 text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </div>
                  <input
                    id="sk-username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(null); }}
                    placeholder="Your cool username"
                    className="w-full bg-surface-container-high border-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none rounded-full py-4 pl-14 pr-6 text-on-surface font-semibold placeholder:text-outline transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

<<<<<<< Updated upstream
              {/* CTA Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onLetsGo}
                  className="group w-full relative inline-flex items-center justify-center px-8 py-5 bg-primary text-on-primary font-extrabold text-xl rounded-full transition-transform active:translate-y-1 hover:-translate-y-0.5 shadow-[0px_4px_0px_0px_#0041c7] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Let's Go!
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </span>
                </button>
=======
              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-4" htmlFor="sk-password">
                  Password
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-5 text-on-surface-variant group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </div>
                  <input
                    id="sk-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    placeholder="Shhh… secret code!"
                    className="w-full bg-surface-container-high border-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none rounded-full py-4 pl-14 pr-14 text-on-surface font-semibold placeholder:text-outline transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-5 text-on-surface-variant hover:text-primary transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
>>>>>>> Stashed changes
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full relative inline-flex items-center justify-center px-8 py-5 bg-primary text-on-primary font-extrabold text-xl rounded-full transition-all active:translate-y-1 hover:-translate-y-0.5 shadow-[0px_6px_0px_0px_#0033b3] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  whileHover={{ scale: isLoading ? 1 : 1.01 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Signing in…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Let's Go!
                      <Rocket className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    </span>
                  )}
                </motion.button>
              </div>

              <div className="text-center pt-1">
                <p className="text-on-surface-variant text-sm font-medium tracking-wide">
                  Ask your specialist if you forgot your credentials!
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
        <div className="text-[#575881] font-sans text-sm font-medium">© 2026 Secured</div>
        <div className="flex gap-8">
          <button type="button" className="text-[#575881] font-sans text-sm font-medium hover:text-primary transition-all opacity-80 hover:opacity-100" onClick={() => onOpenLink('privacy-policy')}>Privacy</button>
          <button type="button" className="text-[#575881] font-sans text-sm font-medium hover:text-primary transition-all opacity-80 hover:opacity-100" onClick={() => onOpenLink('terms')}>Terms</button>
          <button type="button" className="text-[#575881] font-sans text-sm font-medium hover:text-primary transition-all opacity-80 hover:opacity-100" onClick={() => onOpenLink('support')}>Support</button>
        </div>
      </footer>
    </div>
  );
};

export default LoginScreen;
