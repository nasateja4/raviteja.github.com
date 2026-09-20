'use client';

import Link from 'next/link';
import { Box, ArrowDown, Cpu, Layers } from 'lucide-react';
import { ProfileData } from '@/lib/types';

interface HeroProps {
  profile: ProfileData;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-200/45 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-200/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headline, Bio & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Mechanical Design & Automation Engineer</span>
          </div>

          {/* Name & Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-950">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-slate-700">
              {profile.subTitle}
            </p>
          </div>

          {/* Bio paragraph */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {profile.bio}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-2 max-w-md mx-auto lg:mx-0">
            <div className="glass-panel p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="font-display font-extrabold text-2xl text-blue-600">6+</span>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Core Projects</p>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="font-display font-extrabold text-2xl text-cyan-600">3D/CNC</span>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Prototyping</p>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="font-display font-extrabold text-2xl text-indigo-600">VBA/Py</span>
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Automation</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Box className="w-4 h-4" />
              <span>Explore 3D Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 font-semibold text-sm shadow-sm transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right Column: High-tech Visual & Portrait */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            {/* Ambient ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-300/40 via-cyan-300/30 to-indigo-300/40 blur-xl animate-pulse" />
            
            {/* Outer bezel */}
            <div className="relative w-full h-full rounded-3xl p-1 bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 shadow-xl overflow-hidden">
              <img
                src="/static/me.jpg"
                alt={profile.name}
                className="w-full h-full object-cover rounded-[22px]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('me.jpeg')) {
                    target.src = '/static/me.jpeg';
                  } else {
                    target.src = 'https://placehold.co/400x400/e0f2fe/0284c7?text=Ravi+Teja';
                  }
                }}
              />
            </div>

            {/* Floating CAD Badge 1 */}
            <div className="absolute -top-4 -left-6 glass-panel px-3.5 py-2 rounded-xl border border-blue-300 shadow-lg flex items-center gap-2 text-xs font-bold text-slate-800 animate-bounce" style={{ animationDuration: '4s' }}>
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>SolidWorks & FEA</span>
            </div>

            {/* Floating CAD Badge 2 */}
            <div className="absolute -bottom-4 -right-4 glass-panel px-3.5 py-2 rounded-xl border border-cyan-300 shadow-lg flex items-center gap-2 text-xs font-bold text-slate-800 animate-bounce" style={{ animationDuration: '5s' }}>
              <Box className="w-4 h-4 text-cyan-600" />
              <span>Interactive 3D Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
