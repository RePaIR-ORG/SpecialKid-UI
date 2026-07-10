/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lottie from 'lottie-react';
import { 
  Star, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Sprout,
  Smile,
  Heart,
  Sparkle,
  MessageCircle,
  X,
  ShieldCheck,
  Lock,
  BookOpen,
  LifeBuoy,
  Mic,
  Camera,
} from 'lucide-react';
import wavingRobotAnimation from '../lotte files/waving robot.json';
import supportRobotAnimation from '../lotte files/waving robot.json';
import happyRobotAnimation from '../lotte files/happy robot lotte.json';
import sadRobotAnimation from '../lotte files/sad robot lotte.json';
import angryRobotAnimation from '../lotte files/angry robot lotte.json';
import tiredRobotAnimation from '../lotte files/tired robot lotte.json';
import playDoughIllustration from './assets/images/play-dough.png';
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
  | 'profile'
  | 'exit';

type DesignLink = 'privacy-policy' | 'safety-center' | 'parents-guide' | 'help';
type AppView = 'landing' | 'multimodal' | 'mood' | 'talk' | 'capture' | 'join-now' | 'history' | 'privacy-policy-page' | 'safety-center-page' | 'parents-guide-page' | 'help-page' | 'happy-pattern' | 'happy-trampoline' | 'happy-carousel' | 'sad-swinging' | 'angry-weighted-lap-pad' | 'tired-carousel';

type FullScreenInfoView = 'privacy-policy-page' | 'safety-center-page' | 'parents-guide-page' | 'help-page';

const DESIGN_IMAGE_URLS: Record<DesignLink, string> = {
  'privacy-policy': new URL('../design images/privacy policy screen.png', import.meta.url).href,
  'safety-center': new URL('../design images/safety center screen.png', import.meta.url).href,
  'parents-guide': new URL('../design images/parents guide screen.png', import.meta.url).href,
  help: new URL('../design images/help screen.png', import.meta.url).href,
};

const HAPPY_MODE_IMAGE_URLS = {
  pattern: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgoHGvgTj0emfUXVRIrf0aeyFy1GoZLhsfwC1Lwkr92P4c_AdetEVcxTvsakLw4JEveDhOoYS224vSv5huddh64qgjjCmvDe_u7T_ZxEuMMLW6Xizc6ez8b6bxwQ9gqrsf5xfGkeVjqinyn4BAmJeBRyXdPb5kt9BIughqN8fDlb2MLD0jOC455dUAg5kdHY97yN_DdZO0p0IW_6AxA4JoL7VvjfRwl7KIdtdw0vNXgD1aXIPUKduisw',
  beading: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnkW-J_zu5mIPbHxXPVFALiiFkzDTsV08ITphs_B7YLuPvrW2_9kgfCXuwWL6XHWHSV1q2sdv7GtY0v35wAEGuFnjaplG7esnxl0mDn-QINkRE0xKx3pLb_cf2ZuKhKP04zsyAArpUkyEaTapWlIZ13BE6spKmtlQpcISiDoruPq08VINa3tFcaUI_jsWdvQtenVlUj0O3DR4OD2hdV1xteu2cYTIw9kE1tnTqfD9Ec1lC3PxIFWCpxQ',
};

const WEIGHTED_LAP_PAD_IMAGE_URL = new URL('../design images/weighted lappad screen.png', import.meta.url).href;
const CALM_CORNER_IMAGE_URL = new URL('../design images/calm corner screen.png', import.meta.url).href;
const TEARING_PAPER_IMAGE_URL = new URL('../design images/tearing paper screen.png', import.meta.url).href;
const SIMPLE_PUZZLES_IMAGE_URL = 'https://lh3.googleusercontent.com/aida/AP1WRLtur1X9WZXc_7Z_XYabwoO88I6fOUbCaIloX6DM4zeW68pcbMHzrPsfkjUxXss3vYQYjtWGHDORtXnbYeUJp7niEcSzmqB8Xf_WJrofUyvqFQjaSRJr7KxKPHEnebjea1u0NN-GvUAxv3KZHOAN6y29yNu3-NkztCk9nlbg1P2b3l2G4F1xqTvsLMCenwU8eYJtUpMN_qStFTEUILedrpI446s623cgH6YwIoTGLOye6G0wsZhYfn30D2gN';
const BALL_PLAY_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3-hbkON4BtVgKm0oGxWKnAKTFAacBQVpC-qzj8KqHW9PPVdiafp7svMkWePY0Ztl3lKWNOr091gJJSoztOH1IAOx9aFIhm-F-bN4A2yjF3gNSwkuJCLu6Qxl65HAKvRWgb0j_I59S_O7DOIW1RC-QvSpy0-_pKAGafT_G2AskyTcJeS_P9Lrbin9NcPCgT0Pl9FG7snMYNcMq2hzF6KxhYIX3bQF0XZWzO8lDhm_n-w0MCEDRYc_xA';
const BUTTON_BOARD_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS9gXfA9ne7HyjpFI31KsPM6cB-XV93Q7pbJU6npm0BPzS81HVvNFOdvIz9kLutrSU-ClbdTmsj_DSOCp7HLCn8PzvVvu9_kiCSR4VHr4vOoqNqAipm-P8q6fuMdmGKP7i3Pk34TmaYI4uNPDV44oK40Vu1CX752KPOf7kE27tETVELxHJC6_tljrxh2QXgLuFWf2c_xAXF4J0ukjG9PE3hHZrHzAvb9F7SLyf0Nn9aDLmMUWpaeK1NA';

const INFO_PAGE_VIEW_BY_LINK: Record<DesignLink, FullScreenInfoView> = {
  'privacy-policy': 'privacy-policy-page',
  'safety-center': 'safety-center-page',
  'parents-guide': 'parents-guide-page',
  help: 'help-page',
};

const INFO_MESSAGES: Record<InfoLink, string> = {
  'privacy-policy': 'Privacy Policy: RePaIR uses your taps and mood choices to personalize the experience inside the app. It is designed to stay simple and child-friendly.',
  'safety-center': 'Safety Center: Use RePaIR with a trusted adult nearby. If something feels wrong or confusing, tap Exit and ask for help.',
  terms: 'Terms: RePaIR is meant for respectful, supervised use. Please follow your school or family guidance while using the app.',
  support: 'Support: Ask a teacher, parent, caregiver, or school helper if you need assistance using RePaIR.',
  'parents-guide': 'Parents\' Guide: This app helps children notice feelings, choose support options, and move through the experience with simple navigation.',
  help: 'Help: Use the top links to learn more. Exit returns you to the opening screen, and the mood cards let you move through the experience.',
  settings: 'Settings: This area would normally control accessibility, sound, and comfort preferences.',
  profile: 'Student Profile: This area would normally show the student identity and saved preferences.',
  exit: 'Exit returns you to the opening screen.',
};

function FullScreenInfoPage({ pageType, onBack, onOpenLink }: { pageType: DesignLink | 'help'; onBack: () => void; onOpenLink: (link: DesignLink) => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const pageConfig = {
    'privacy-policy': {
      eyebrow: 'Family-ready privacy',
      title: 'Privacy & Data Sovereignty',
      icon: ShieldCheck,
      intro: 'RePaIR keeps every child’s experience gentle, private, and easy to understand.',
      sections: [
        {
          icon: Lock,
          title: '100% On-Device Processing',
          body: 'Facial and voice input stay inside the browser whenever possible, so sensitive information never needs to leave the device. That keeps the experience simple and private.',
        },
        {
          icon: Sparkles,
          title: 'Data Minimization & Trust',
          body: 'Mood history and taps are kept local and lightweight. There are no ad trackers or third-party scripts in the experience, and the app is built to be calm and respectful.',
        },
      ],
      footerNote: 'Last updated July 2026. For questions, contact our safety team at safety@repair.com.',
    },
    'safety-center': {
      eyebrow: 'Support first',
      title: 'Safety Center',
      icon: ShieldCheck,
      intro: 'RePaIR is designed to be used with a trusted adult nearby and to feel reassuring in moments of stress.',
      sections: [
        {
          icon: LifeBuoy,
          title: 'Use with a trusted adult',
          body: 'If something feels confusing, upsetting, or unsafe, the app encourages a pause and a quick check-in with a caregiver, teacher, or family helper.',
        },
        {
          icon: Heart,
          title: 'Calm and clear choices',
          body: 'Every step is designed to be simple, with clear choices and supportive guidance so a child can move at a comfortable pace.',
        },
      ],
      footerNote: 'Please ask for help any time a child feels uncertain or needs extra support.',
    },
    'parents-guide': {
      eyebrow: 'Helpful guidance',
      title: 'Parents’ Guide',
      icon: BookOpen,
      intro: 'This guide helps adults understand the experience and how to support a child using RePaIR at home or in school.',
      sections: [
        {
          icon: Sprout,
          title: 'Encourage calm routines',
          body: 'Use the app as a gentle check-in tool. Pair it with familiar routines, simple language, and plenty of encouragement.',
        },
        {
          icon: Sparkle,
          title: 'Support choice and agency',
          body: 'Let children choose their pace, revisit the activities, and talk through what feels helpful or hard in the moment.',
        },
      ],
      footerNote: 'A supportive adult can help set up the experience and review progress together.',
    },
    help: {
      eyebrow: 'How to get started',
      title: 'Help',
      icon: LifeBuoy,
      intro: 'Use the top navigation to explore the app and find the support you need.',
      sections: [
        {
          icon: MessageCircle,
          title: 'Friendly reminders',
          body: 'The app guides a child through mood, talk, and capture moments with simple, encouraging prompts.',
        },
        {
          icon: ArrowRight,
          title: 'Easy next steps',
          body: 'From the home screen, return to the opening page or move into the activity flow whenever a child is ready.',
        },
      ],
      footerNote: 'If you need a hand, a trusted adult can help you explore the app together.',
    },
  }[pageType];

  const Icon = pageConfig.icon;

  const handleHelpAction = (action: 'mic' | 'camera' | 'contact') => {
    const messages = {
      mic: 'Please check browser permissions for the microphone and try again. A trusted adult can help if needed.',
      camera: 'Please confirm camera access in your browser settings. If the camera still does not appear, ask a trusted adult to help.',
      contact: 'You can also read the Parents’ Guide or Safety Center for extra support and troubleshooting tips.',
    };

    window.alert(messages[action]);
  };

  return (
    <div className="min-h-screen w-full bg-[#f9f9ff] text-[#171c24]">
      <header className="border-b border-[#dfe2ee] bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e1e0ff] text-[#4343d5]">
              <div className="h-7 w-7 overflow-hidden rounded-full">
                <Lottie animationData={supportRobotAnimation} loop autoplay className="h-full w-full" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">RePaIR</p>
              <p className="text-base font-semibold text-[#171c24]">Support pages</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-[#dfe2ee] bg-[#ffffff] px-4 py-2 text-sm font-semibold text-[#2a2b51] shadow-[0_6px_0_0_#dfe2ee] transition hover:-translate-y-0.5 hover:bg-[#f4f2ff]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-[#dfe2ee] bg-white shadow-[0_16px_48px_rgba(42,43,81,0.08)]">
          {pageType === 'help' ? (
            <>
              <div className="border-b border-[#eef0ff] bg-[#f8f5ff] px-6 py-8 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Need a hand?</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-[#171c24] sm:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Help Center
                    </h1>
                    <p className="mt-3 text-lg leading-8 text-[#464555]" style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}>
                      I’m here to help you get back to learning and having fun. Choose a quick fix below or read our parent guide.
                    </p>
                  </div>
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e1e0ff] text-[#4343d5] sm:h-28 sm:w-28">
                    <div className="h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20">
                      <Lottie animationData={supportRobotAnimation} loop autoplay className="h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 px-6 py-8 sm:px-8 lg:px-10">
                <div>
                  <h2 className="mb-4 text-2xl font-black text-[#171c24]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Quick Fixes
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleHelpAction('mic')}
                      className="group flex flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-[#dfe2ee] bg-[#fdd400] p-6 text-center transition hover:-translate-y-1 hover:bg-[#f2bf00]"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-[#6f5c00]">
                        <Mic className="h-8 w-8" />
                      </div>
                      <span className="text-xl font-black text-[#171c24]">Microphone isn’t working?</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHelpAction('camera')}
                      className="group flex flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-[#dfe2ee] bg-[#56f9f9] p-6 text-center transition hover:-translate-y-1 hover:bg-[#2fe4e4]"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-[#006465]">
                        <Camera className="h-8 w-8" />
                      </div>
                      <span className="text-xl font-black text-[#171c24]">Camera can’t see me?</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[#dfe2ee] bg-[#f8f5ff] p-6 sm:p-8">
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-[#171c24]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <LifeBuoy className="h-5 w-5 text-[#4343d5]" />
                    Parent Support & Troubleshooting
                  </h2>
                  <div className="space-y-4">
                    <div className="rounded-[1.25rem] border border-[#dfe2ee] bg-white p-4 sm:p-5">
                      <h3 className="text-lg font-black text-[#171c24]">Troubleshooting Inputs</h3>
                      <p className="mt-2 text-base leading-8 text-[#464555]">
                        If a voice or facial scan fails, make sure the browser has camera and microphone permissions. A trusted adult can help check the lock icon in the address bar.
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-[#dfe2ee] bg-white p-4 sm:p-5">
                      <h3 className="text-lg font-black text-[#171c24]">App Reset</h3>
                      <p className="mt-2 text-base leading-8 text-[#464555]">
                        Clearing the browser data or restarting the app can help if something is loading incorrectly. This is a simple way to refresh the experience.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleHelpAction('contact')}
                      className="flex items-center gap-2 text-sm font-semibold text-[#4343d5] transition hover:gap-3"
                    >
                      Contact Support Team
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-[#eef0ff] bg-[#f8f5ff] px-6 py-8 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[#e1e0ff] text-[#4343d5]">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">{pageConfig.eyebrow}</p>
                      <h1 className="mt-1 text-3xl font-black tracking-tight text-[#171c24] sm:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {pageConfig.title}
                      </h1>
                      <p className="mt-3 max-w-2xl text-lg leading-8 text-[#464555]" style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}>
                        {pageConfig.intro}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 px-6 py-8 sm:px-8 lg:px-10">
                {pageConfig.sections.map(({ icon: SectionIcon, title, body }) => (
                  <article key={title} className="rounded-[1.5rem] border border-[#dfe2ee] bg-[#fcfbff] p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-3 text-[#4343d5]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e1e0ff]">
                        <SectionIcon className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-black text-[#171c24]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {title}
                      </h2>
                    </div>
                    <p className="text-base leading-8 text-[#464555]" style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}>
                      {body}
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}

          <footer className="border-t border-[#eef0ff] bg-[#f8f5ff] px-6 py-6 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-[#464555]" style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif" }}>
                {pageConfig.footerNote}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onOpenLink('privacy-policy')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pageType === 'privacy-policy' ? 'bg-[#4343d5] text-white' : 'bg-white text-[#464555] hover:bg-[#f2efff]'}`}
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLink('safety-center')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pageType === 'safety-center' ? 'bg-[#4343d5] text-white' : 'bg-white text-[#464555] hover:bg-[#f2efff]'}`}
                >
                  Safety Center
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLink('parents-guide')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pageType === 'parents-guide' ? 'bg-[#4343d5] text-white' : 'bg-white text-[#464555] hover:bg-[#f2efff]'}`}
                >
                  Parents’ Guide
                </button>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

function HappyModePatternPage({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <div className="min-h-screen w-full bg-[#f8f5ff] text-[#2a2b51]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dbd9ff] bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-[#dbd9ff] bg-white px-4 py-2 text-sm font-semibold text-[#2a2b51] shadow-sm transition hover:bg-[#f2efff]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to App
        </button>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Happy mode</div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Today I feel</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-[#2a2b51] sm:text-5xl">Happy</h1>
        </div>

        <section className="w-full overflow-hidden rounded-[2rem] border border-[#dbd9ff] bg-white p-5 shadow-[0_20px_60px_rgba(42,43,81,0.08)] sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Kinetic playhouse</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#2a2b51] sm:text-4xl">PATTERN TRACING</h2>
            </div>
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2962FF] text-white shadow-[0_8px_0_#0038aa] transition hover:scale-105 active:translate-y-1"
              aria-label="Play audio"
            >
              <span className="material-symbols-outlined text-3xl">volume_up</span>
            </button>
          </div>

          <div className="relative mb-8 overflow-hidden rounded-[1.5rem] border border-[#dbd9ff] bg-[#f2efff] p-4 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(41,98,255,0.1),_transparent_55%)]" />
            <div className="relative mx-auto flex aspect-[4/3] max-w-3xl items-center justify-center rounded-[1.25rem] border border-[#dfe2ee] bg-white/80 p-4 sm:p-8">
              <div className="relative h-full w-full rounded-[1rem] bg-[#f8f5ff] p-4">
                <div className="absolute left-[12%] top-[22%] h-16 w-16 rounded-full border-[10px] border-[#2962FF]" />
                <div className="absolute left-[28%] top-[22%] h-16 w-16 rounded-full border-[10px] border-[#fdd400]" />
                <div className="absolute left-[44%] top-[40%] h-16 w-16 rounded-full border-[10px] border-[#2962FF]" />
                <div className="absolute left-[60%] top-[24%] h-16 w-16 rounded-full border-[10px] border-[#fdd400]" />
                <div className="absolute left-[76%] top-[50%] h-16 w-16 rounded-full border-[10px] border-[#2962FF]" />
                <div className="absolute left-[18%] top-[24%] h-3 w-[28%] rounded-full bg-[#2962FF]" />
                <div className="absolute left-[36%] top-[30%] h-3 w-[18%] rounded-full bg-[#fdd400]" />
                <div className="absolute left-[50%] top-[46%] h-3 w-[20%] rounded-full bg-[#2962FF]" />
                <div className="absolute left-[66%] top-[34%] h-3 w-[16%] rounded-full bg-[#fdd400]" />
                <div className="absolute left-[40%] top-[65%] rounded-full border-4 border-[#2962FF] px-4 py-2 text-sm font-black text-[#2962FF]">Trace the path!</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="mx-auto flex w-full max-w-md items-center justify-center rounded-full bg-[#2962FF] px-6 py-5 text-2xl font-black text-white shadow-[0_8px_0_#0038aa] transition hover:scale-[1.02] active:translate-y-1"
          >
            I’m Done! ★
          </button>
        </section>
      </main>
    </div>
  );
}

function HappyModeTrampolinePage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      key: 'trampoline',
      title: 'TRAMPOLINE JUMPING',
      heading: 'Today I feel',
      accentText: 'Happy',
      imageSrc: 'https://lh3.googleusercontent.com/aida/AP1WRLvs5-5A-RJAy1800ilAUOl1qnlGv1v4roRs_2OJZvwczh2VO2rZ6TauseXcivd-pQmuiGCGzlL1y7zcavXEZRItPODbnL-KBt1aRiHWxH0rJER5AKKNdQO8Vo-deRNN-zaKzM_dBD1YoFiOHTSORBEs88YshRR3Li-C9VznpwNHa4xcAuqJ0ZLFG_R3ODv0nx1IEyGesJXW1xKvfztYGm21YIww6WBL7jpnFPA3rNkQ2cOcFav6Hljh9AEG',
      cardClassName: 'border-[#e8e6ff] bg-[#f2efff]',
      buttonLabel: 'I’m Done! ★',
      heroClassName: 'text-[#2a2b51]',
      showHintText: false,
    },
    {
      key: 'pattern',
      title: 'PATTERN TRACING',
      heading: 'Today I feel',
      accentText: 'Happy',
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgoHGvgTj0emfUXVRIrf0aeyFy1GoZLhsfwC1Lwkr92P4c_AdetEVcxTvsakLw4JEveDhOoYS224vSv5huddh64qgjjCmvDe_u7T_ZxEuMMLW6Xizc6ez8b6bxwQ9gqrsf5xfGkeVjqinyn4BAmJeBRyXdPb5kt9BIughqN8fDlb2MLD0jOC455dUAg5kdHY97yN_DdZO0p0IW_6AxA4JoL7VvjfRwl7KIdtdw0vNXgD1aXIPUKduisw',
      cardClassName: 'border-[#dbd9ff] bg-[#f2efff]',
      buttonLabel: 'I’m Done! ★',
      heroClassName: 'text-[#2a2b51]',
      showHintText: true,
      hintText: 'Trace the path!',
    },
    {
      key: 'beading',
      title: 'BEADING',
      heading: 'Today I feel',
      accentText: 'Happy',
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnkW-J_zu5mIPbHxXPVFALiiFkzDTsV08ITphs_B7YLuPvrW2_9kgfCXuwWL6XHWHSV1q2sdv7GtY0v35wAEGuFnjaplG7esnxl0mDn-QINkRE0xKx3pLb_cf2ZuKhKP04zsyAArpUkyEaTapWlIZ13BE6spKmtlQpcISiDoruPq08VINa3tFcaUI_jsWdvQtenVlUj0O3DR4OD2hdV1xteu2cYTIw9kE1tnTqfD9Ec1lC3PxIFWCpxQ',
      cardClassName: 'border-[#dbd9ff] bg-[#f2efff]',
      buttonLabel: 'I’m Done! ★',
      heroClassName: 'text-[#2a2b51]',
      showHintText: false,
    },
  ];

  const currentSlide = slides[activeSlide];

  const handleAdvance = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
      return;
    }
    onBack();
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f5ff] text-[#2a2b51]">
      <header className="flex w-full items-center justify-between px-6 py-6 sm:px-8">
        <div className="text-2xl font-black tracking-tight text-[#2962FF]">RePaIR</div>
        <div className="w-[80px]" />
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl flex-col items-center px-4 pb-16 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#2a2b51] sm:text-5xl">
          Today I feel <span className="text-[#fdd400] drop-shadow-sm">Happy</span>
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.key}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative mx-auto flex w-full max-w-5xl flex-col items-center rounded-[1.25rem] bg-white p-8 shadow-[0_20px_60px_rgba(42,43,81,0.08)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(42,43,81,0.12)] sm:p-10 md:p-12"
          >
            <div className="mb-8 flex items-center gap-4 sm:gap-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-[#2a2b51] sm:text-4xl md:text-5xl">
                {currentSlide.title}
              </h2>
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2962FF] text-white shadow-[0_8px_0_#0038aa] transition-all hover:scale-105 active:translate-y-1"
                aria-label="Play audio"
              >
                <span className="material-symbols-outlined text-3xl">volume_up</span>
              </button>
            </div>

            <div className={`mb-10 flex w-full items-center justify-center overflow-hidden rounded-[1rem] border-4 ${currentSlide.cardClassName} p-4 sm:p-6`}>
              <div className="relative w-full max-w-3xl">
                <img
                  alt={`${currentSlide.title} Activity`}
                  className="h-full w-full object-contain p-2 sm:p-4 md:p-6"
                  src={currentSlide.imageSrc}
                />
                {currentSlide.showHintText && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rounded-full border-2 border-[#2962FF] bg-white/90 px-6 py-3 text-lg font-bold text-[#2962FF] backdrop-blur-md">
                      {currentSlide.hintText}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdvance}
              className="flex w-full max-w-md items-center justify-center rounded-full bg-[#2962FF] px-6 py-5 text-2xl font-black text-white shadow-[0_8px_0_#0038aa] transition-all hover:scale-[1.02] active:translate-y-1"
            >
              {currentSlide.buttonLabel}
            </button>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-3 rounded-full transition ${activeSlide === index ? 'w-8 bg-[#2962FF] shadow-[0_0_15px_rgba(41,98,255,0.4)]' : 'w-3 bg-[#dbd9ff]'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function SadCarouselPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      key: 'swinging',
      title: 'SWINGING',
      badge: 'Sad mode',
      actionLabel: 'Next',
      content: (
        <div className="overflow-hidden rounded-[1.5rem] border border-[#dbd9ff] bg-[#f2efff] p-4 sm:p-6">
          <img
            alt="Child on a swing"
            className="mx-auto h-full w-full max-w-3xl rounded-[1rem] object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVJiqUs5fDBlw_fNWtIEJyFXswydKuGnlBk0vSsN_iUvi6gZnQAcVkJsd4rv2Kz5F7M3afDM2A9qQHDzx3P-RaB6uS-jrZA-VwG703yqVt8cJ32NXFIYpm4oM0CZ1S8aSoDzSnuELgvMr30awTvkg2KZuZnWijfls_Q3EXL4b6VCi190_SxHISybpPAHyBikVywVsJKz8R3MQh6PlanmOs1HINPWzN622U6AXT8NzmyPTCyeHkFjx02CujRhDlh7HNgqo"
          />
        </div>
      ),
    },
    {
      key: 'play-dough',
      title: 'PLAY DOUGH',
      badge: 'Sad mode',
      actionLabel: 'Next',
      content: (
        <div className="overflow-hidden rounded-[1.5rem] border border-[#dbd9ff] bg-[#f2efff] p-4 sm:p-6">
          <img
            alt="Playing with play dough"
            className="mx-auto h-[280px] sm:h-[320px] md:h-[360px] w-auto rounded-[1rem] object-contain"
            loading="eager"
            src={playDoughIllustration}
          />
        </div>
      ),
    },
    {
      key: 'scribbling',
      title: 'SCRIBBLING',
      badge: 'Sad mode',
      actionLabel: 'I’m Done! ★',
      content: (
        <div className="overflow-hidden rounded-[1.5rem] border border-[#dbd9ff] bg-[#f2efff] p-4 sm:p-6">
          <img
            alt="Scribbling illustration"
            className="mx-auto h-full w-full max-w-3xl rounded-[1rem] object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPYcpxNtD-5pNeIf6NGbk9bqNK2Oc4Vj4MdPr-pjYxgvz-RDaPKEKjnWu6CuXuex0Vnfn9nEVMm0_vjz0SrzybTaALxZwY6vy6ef43-RTdzr1VyViEozPIqSytKmLcVpJQ3J2lq9EHz4Q5eAsoQOOCymJVPMonD-BoucLxgAeUyrpxfrEEg4EntDmcgeRp7stcMesJNRUm0-2do08TIC1wrSxiHqYCqJAh9YW-aA9QZts838AgSzPyLw"
          />
        </div>
      ),
    },
  ];

  const currentSlide = slides[activeSlide];

  const handleAdvance = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
      return;
    }
    onBack();
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f5ff] text-[#2a2b51]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dbd9ff] bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-[#dbd9ff] bg-white px-4 py-2 text-sm font-semibold text-[#2a2b51] shadow-sm transition hover:bg-[#f2efff]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to App
        </button>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">{currentSlide.badge}</div>
      </header>

      <main className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Today I feel</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-[#2962FF] sm:text-5xl">Sad</h1>
        </div>

        <section className="relative w-full overflow-hidden rounded-[2rem] border border-[#dbd9ff] bg-white p-5 shadow-[0_20px_60px_rgba(42,43,81,0.08)] sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col items-center text-center">
            <h2 className="text-3xl font-black tracking-tight text-[#2a2b51] sm:text-4xl">{currentSlide.title}</h2>
            <button
              type="button"
              className="mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2962FF] text-white shadow-[0_8px_0_#0038aa] transition hover:scale-105 active:translate-y-1"
              aria-label="Play audio"
            >
              <span className="material-symbols-outlined text-3xl">volume_up</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-8"
            >
              {currentSlide.content}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={handleAdvance}
            className="mx-auto flex w-full max-w-md items-center justify-center rounded-full bg-[#2962FF] px-6 py-5 text-2xl font-black text-white shadow-[0_8px_0_#0038aa] transition hover:scale-[1.02] active:translate-y-1"
          >
            {currentSlide.actionLabel}
          </button>
        </section>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-28 sm:w-36 lg:w-44">
          <Lottie animationData={sadRobotAnimation} loop autoplay className="h-full w-full" />
        </div>

        <div className="mt-8 flex gap-4">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-3 rounded-full transition ${activeSlide === index ? 'w-8 bg-[#2962FF] shadow-[0_0_15px_rgba(41,98,255,0.4)]' : 'w-3 bg-[#dbd9ff]'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function HappyModeCarouselPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      key: 'pattern',
      title: 'PATTERN TRACING',
      badge: 'Happy mode',
      actionLabel: 'Next',
      content: (
        <div className="relative mx-auto flex aspect-[4/3] w-full max-w-3xl items-center justify-center rounded-[1.25rem] border border-[#dfe2ee] bg-white/80 p-4 sm:p-8">
          <div className="relative h-full w-full rounded-[1rem] overflow-hidden bg-[#f8f5ff] p-4 flex items-center justify-center">
            <img
              alt="Pattern Tracing Activity"
              className="h-full w-full object-contain"
              src={HAPPY_MODE_IMAGE_URLS.pattern}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'beading',
      title: 'BEADING',
      badge: 'Happy mode',
      actionLabel: 'Next',
      content: (
        <div className="grid w-full max-w-4xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#dbd9ff] bg-[#f2efff] p-4 shadow-inner">
            <img
              alt="Beading activity"
              className="h-full w-full rounded-[1rem] object-cover"
              src={HAPPY_MODE_IMAGE_URLS.beading}
            />
          </div>
          <div className="flex flex-col justify-center rounded-[1.5rem] border border-[#dbd9ff] bg-[#f8f5ff] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Thread and count</p>
            <h3 className="mt-3 text-2xl font-black text-[#2a2b51]">Pick a bead and smile!</h3>
            <p className="mt-3 text-base leading-8 text-[#464555]">Use calm hands, take one bead at a time, and enjoy each tiny win.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="h-10 w-10 rounded-full border-4 border-[#2962FF] bg-white" />
              <div className="h-10 w-10 rounded-full border-4 border-[#fdd400] bg-white" />
              <div className="h-10 w-10 rounded-full border-4 border-[#2962FF] bg-white" />
              <div className="h-10 w-10 rounded-full border-4 border-[#fdd400] bg-white" />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'trampoline',
      title: 'TRAMPOLINE JUMPING',
      badge: 'Happy mode',
      actionLabel: 'I’m Done! ★',
      content: (
        <div className="relative mx-auto flex w-full max-w-3xl items-center justify-center overflow-hidden rounded-[1.25rem] border border-[#dfe2ee] bg-[#f2efff] p-4 sm:p-8">
          <img
            alt="Trampoline jumping activity"
            className="h-full w-full rounded-[1rem] object-contain"
            src="https://lh3.googleusercontent.com/aida/AP1WRLvs5-5A-RJAy1800ilAUOl1qnlGv1v4roRs_2OJZvwczh2VO2rZ6TauseXcivd-pQmuiGCGzlL1y7zcavXEZRItPODbnL-KBt1aRiHWxH0rJER5AKKNdQO8Vo-deRNN-zaKzM_dBD1YoFiOHTSORBEs88YshRR3Li-C9VznpwNHa4xcAuqJ0ZLFG_R3ODv0nx1IEyGesJXW1xKvfztYGm21YIww6WBL7jpnFPA3rNkQ2cOcFav6Hljh9AEG"
          />
        </div>
      ),
    },
  ];

  const currentSlide = slides[activeSlide];

  const handleAdvance = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
      return;
    }
    onBack();
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f5ff] text-[#2a2b51]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dbd9ff] bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-[#dbd9ff] bg-white px-4 py-2 text-sm font-semibold text-[#2a2b51] shadow-sm transition hover:bg-[#f2efff]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to App
        </button>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">{currentSlide.badge}</div>
      </header>

      <main className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Today I feel</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-[#fdd400] sm:text-5xl">Happy</h1>
        </div>

        <section className="w-full overflow-hidden rounded-[2rem] border border-[#dbd9ff] bg-white p-5 shadow-[0_20px_60px_rgba(42,43,81,0.08)] sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col items-center text-center">
            <h2 className="text-3xl font-black tracking-tight text-[#2a2b51] sm:text-4xl">{currentSlide.title}</h2>
            <button
              type="button"
              className="mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2962FF] text-white shadow-[0_8px_0_#0038aa] transition hover:scale-105 active:translate-y-1"
              aria-label="Play audio"
            >
              <span className="material-symbols-outlined text-3xl">volume_up</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-8"
            >
              {currentSlide.content}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={handleAdvance}
            className="mx-auto flex w-full max-w-md items-center justify-center rounded-full bg-[#2962FF] px-6 py-5 text-2xl font-black text-white shadow-[0_8px_0_#0038aa] transition hover:scale-[1.02] active:translate-y-1"
          >
            {currentSlide.actionLabel}
          </button>
        </section>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-28 sm:w-36 lg:w-44">
          <Lottie animationData={happyRobotAnimation} loop autoplay className="h-full w-full" />
        </div>

        <div className="mt-8 flex gap-4">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-3 rounded-full transition ${activeSlide === index ? 'w-8 bg-[#2962FF] shadow-[0_0_15px_rgba(41,98,255,0.4)]' : 'w-3 bg-[#dbd9ff]'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function AngryModeCarouselPage({ onBack }: { onBack: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      key: 'weighted-lap-pad',
      title: 'WEIGHTED LAP PAD',
      badge: 'Angry mode',
      actionLabel: 'Next',
      content: (
        <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-[#dbd9ff] bg-[#f2efff] flex items-center justify-center">
          <img
            alt="Weighted lap pad activity"
            className="h-full w-full object-contain p-4 sm:p-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3nXso49KYybnpLjX6pegqoOoYytgoqJTDVH6y1KEvOP0cuUNUG3yGMEb7K_2Q5isXAPkMT1bOZDnAivrYkD0zqBAAfnIiGYm3xQtlK0ApgMK54uOEfRJtUlEwZEy1-3r0O2-9-kH_p0LfY9lKoH4ydmvRBeR9ajkrxOkYrc0wYbtD-Y9ZlJFfvDtBl2CG_vPNKatoyzXBYYnN7Z5Xvn5J2PAjyVBDlP8MT84Bp8-XtwIXIXuSIEBw-w"
          />
        </div>
      ),
    },
    {
      key: 'calm-corner',
      title: 'CALM CORNER',
      badge: 'Angry mode',
      actionLabel: 'Next',
      content: (
        <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-[#dbd9ff] bg-[#f2efff] flex items-center justify-center">
          <img
            alt="Calm corner activity"
            className="h-full w-full object-contain p-4 sm:p-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM2uwt8ePqsLgk33Wpthx3bz5_OdJd5k2kSSO1AAAdOJkDcAqIXiIRzkuNa3_RSjLuD8vSy61-TM8qERUzqQ9XT5H0sArEtqc5OyZ7udNo8jrACmLZgd8sEwYaULOkfDz5lCCtonI8rJJkOWamMAN7VV58bLUK3GhOFwq92RKhGW7SDvhtx8FTl35489wosG8vzI2Sxv0NPgGOMPHLOSl1sjMR0onq_9KKZuCHuhQFS1lDFHRNe4kcYA"
          />
        </div>
      ),
    },
    {
      key: 'tearing-paper',
      title: 'TEARING PAPER',
      badge: 'Angry mode',
      actionLabel: "I'm Done! ★",
      content: (
        <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-[#dbd9ff] bg-[#f2efff] flex items-center justify-center">
          <img
            alt="Tearing paper activity"
            className="h-full w-full object-contain p-4 sm:p-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRPlbT5tlRxM2_vFC-vxJCh8iNlknrx24hAPxC_u6q8vqoWHz6SLgUYCcDqyxbzEVTK7uO7kbzGScOeGaoh7go3eUg5BK_XOECN4Bc8nZv0cs7lkmorsVNxjyQEj53TK_S9GuvCRlOhKr4hZkvIlRSgCytJ7XG8-IHZR0OBFA8HbmSpBrNJiY4-3pJUMj_wJuVev0nX4QlHF-eDTBKKYmpHcEd1xg9QfkcVbv-NhxeecQRwkznx0P0TQ"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
        setActiveSlide((prev) => {
          if (prev < slides.length - 1) return prev + 1;
          onBack();
          return prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const currentSlide = slides[activeSlide];

  const handleAdvance = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
      return;
    }
    onBack();
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f5ff] text-[#2a2b51]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dbd9ff] bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-[#dbd9ff] bg-white px-4 py-2 text-sm font-semibold text-[#2a2b51] shadow-sm transition hover:bg-[#f2efff]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to App
        </button>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">{currentSlide.badge}</div>
      </header>

      <main className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Today I feel</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-[#ff4d2e] sm:text-5xl">Angry</h1>
        </div>

        <section className="relative w-full overflow-hidden rounded-[2rem] border border-[#dbd9ff] bg-white p-5 shadow-[0_20px_60px_rgba(42,43,81,0.08)] sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col items-center text-center">
            <h2 className="text-3xl font-black tracking-tight text-[#2a2b51] sm:text-4xl">{currentSlide.title}</h2>
            <button
              type="button"
              className="mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2962FF] text-white shadow-[0_8px_0_#0038aa] transition hover:scale-105 active:translate-y-1"
              aria-label="Play audio"
            >
              <span className="material-symbols-outlined text-3xl">volume_up</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-8"
            >
              {currentSlide.content}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={handleAdvance}
            className="mx-auto flex w-full max-w-md items-center justify-center rounded-full bg-[#2962FF] px-6 py-5 text-2xl font-black text-white shadow-[0_8px_0_#0038aa] transition hover:scale-[1.02] active:translate-y-1"
          >
            {currentSlide.actionLabel}
          </button>
        </section>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-28 sm:w-36 lg:w-44">
          <Lottie animationData={angryRobotAnimation} loop autoplay className="h-full w-full" />
        </div>

        <div className="mt-8 flex gap-4">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-3 rounded-full transition ${activeSlide === index ? 'w-8 bg-[#2962FF] shadow-[0_0_15px_rgba(41,98,255,0.4)]' : 'w-3 bg-[#dbd9ff]'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function TiredModeCarouselPage({ onBack }: { onBack: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      key: 'ball-play',
      title: 'BALL PLAY',
      badge: 'Tired mode',
      actionLabel: 'Next',
      content: (
        <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-[#dbd9ff] bg-[#f2efff] flex items-center justify-center">
          <img
            alt="Ball play activity"
            className="h-full w-full object-contain p-4 sm:p-8"
            src={BALL_PLAY_IMAGE_URL}
          />
        </div>
      ),
    },
    {
      key: 'simple-puzzles',
      title: 'SIMPLE PUZZLES',
      badge: 'Tired mode',
      actionLabel: 'Next',
      content: (
        <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-[#dbd9ff] bg-[#f2efff] flex items-center justify-center">
          <img
            alt="Simple puzzles activity"
            className="h-full w-full object-contain p-4 sm:p-8"
            src={SIMPLE_PUZZLES_IMAGE_URL}
          />
        </div>
      ),
    },
    {
      key: 'button-board',
      title: 'BUTTON BOARD',
      badge: 'Tired mode',
      actionLabel: "I'm Done! ★",
      content: (
        <div className="w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] border-4 border-[#dbd9ff] bg-[#f2efff] flex items-center justify-center">
          <img
            alt="Button board activity"
            className="h-full w-full object-contain p-4 sm:p-8"
            src={BUTTON_BOARD_IMAGE_URL}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
        setActiveSlide((prev) => {
          if (prev < slides.length - 1) return prev + 1;
          onBack();
          return prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const currentSlide = slides[activeSlide];

  const handleAdvance = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
      return;
    }
    onBack();
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f5ff] text-[#2a2b51]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dbd9ff] bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-[#dbd9ff] bg-white px-4 py-2 text-sm font-semibold text-[#2a2b51] shadow-sm transition hover:bg-[#f2efff]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to App
        </button>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">{currentSlide.badge}</div>
      </header>

      <main className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-5xl flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#575881]">Today I feel</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-[#8eb4ff] sm:text-5xl">Tired</h1>
        </div>

        <section className="relative w-full overflow-hidden rounded-[2rem] border border-[#dbd9ff] bg-white p-5 shadow-[0_20px_60px_rgba(42,43,81,0.08)] sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col items-center text-center">
            <h2 className="text-3xl font-black tracking-tight text-[#2a2b51] sm:text-4xl">{currentSlide.title}</h2>
            <button
              type="button"
              className="mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2962FF] text-white shadow-[0_8px_0_#0038aa] transition hover:scale-105 active:translate-y-1"
              aria-label="Play audio"
            >
              <span className="material-symbols-outlined text-3xl">volume_up</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-8"
            >
              {currentSlide.content}
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={handleAdvance}
            className="mx-auto flex w-full max-w-md items-center justify-center rounded-full bg-[#2962FF] px-6 py-5 text-2xl font-black text-white shadow-[0_8px_0_#0038aa] transition hover:scale-[1.02] active:translate-y-1"
          >
            {currentSlide.actionLabel}
          </button>
        </section>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-28 sm:w-36 lg:w-44">
          <Lottie animationData={tiredRobotAnimation} loop autoplay className="h-full w-full" />
        </div>

        <div className="mt-8 flex gap-4">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-3 rounded-full transition ${activeSlide === index ? 'w-8 bg-[#2962FF] shadow-[0_0_15px_rgba(41,98,255,0.4)]' : 'w-3 bg-[#dbd9ff]'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isWaving, setIsWaving] = useState(false);
  const [returnView, setReturnView] = useState<AppView>('landing');

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
  };

  const openInfoLink = (link: InfoLink) => {
    if (link === 'exit') {
      setCurrentView('landing');
      return;
    }

    if (link === 'help' || link === 'privacy-policy' || link === 'safety-center' || link === 'parents-guide') {
      setReturnView(currentView);
      setCurrentView(INFO_PAGE_VIEW_BY_LINK[link as DesignLink]);
      return;
    }

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
        onMoodSelect={(moodId) => {
          if (moodId === 'happy') {
            setCurrentView('happy-carousel');
          }
          if (moodId === 'sad') {
            setCurrentView('sad-swinging');
          }
          if (moodId === 'angry') {
            setCurrentView('angry-weighted-lap-pad');
          }
          if (moodId === 'tired') {
            setCurrentView('tired-carousel');
          }
        }}
      />
    );
  }

  if (currentView === 'happy-pattern' || currentView === 'happy-trampoline' || currentView === 'happy-carousel') {
    return <HappyModeCarouselPage onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'sad-swinging') {
    return <SadCarouselPage onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'angry-weighted-lap-pad') {
    return <AngryModeCarouselPage onBack={() => setCurrentView('mood')} />;
  }

  if (currentView === 'tired-carousel') {
    return <TiredModeCarouselPage onBack={() => setCurrentView('mood')} />;
  }

  if (currentView === 'history') {
    return <HistoryScreen onBackToMood={() => setCurrentView('mood')} />;
  }

  if (currentView === 'join-now') {
    return (
      <JoinNowScreen
        onBack={() => setCurrentView('landing')}
        onOpenLink={(link) => openInfoLink(link as InfoLink)}
        onLetsGo={() => setCurrentView('multimodal')}
      />
    );
  }

  if (currentView === 'privacy-policy-page') {
    return <FullScreenInfoPage pageType="privacy-policy" onBack={() => setCurrentView('landing')} onOpenLink={(link) => openInfoLink(link)} />;
  }

  if (currentView === 'safety-center-page') {
    return <FullScreenInfoPage pageType="safety-center" onBack={() => setCurrentView('landing')} onOpenLink={(link) => openInfoLink(link)} />;
  }

  if (currentView === 'parents-guide-page') {
    return <FullScreenInfoPage pageType="parents-guide" onBack={() => setCurrentView('landing')} onOpenLink={(link) => openInfoLink(link)} />;
  }

  if (currentView === 'help-page') {
    return <FullScreenInfoPage pageType="help" onBack={() => setCurrentView('landing')} onOpenLink={(link) => openInfoLink(link)} />;
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
            <span className="text-[#dbd9ff]">|</span>
            <button type="button" className="hover:text-[#2962FF] transition-colors cursor-pointer" onClick={() => openInfoLink('parents-guide')}>Parents' Guide</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
