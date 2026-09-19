'use client';

import { Briefcase, GraduationCap, MapPin, CheckCircle } from 'lucide-react';
import { Experience, Education } from '@/lib/types';

interface ExperienceTimelineProps {
  experiences: Experience[];
  education: Education[];
}

export default function ExperienceTimeline({ experiences, education }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-20 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Work Experience */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">Career History</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">Work Experience</h2>
            </div>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-blue-300 before:to-slate-200">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-10">
                <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 shadow-sm" />
                <div className="glass-panel p-6 rounded-2xl border border-slate-200 glass-panel-hover space-y-3 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-slate-900">{exp.title}</h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-blue-700">
                    {exp.company}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.location}</span>
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Credentials */}
        <div id="education">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700">Academic Background</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">Education & Degrees</h2>
            </div>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-indigo-600 before:via-indigo-300 before:to-slate-200">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-10">
                <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 shadow-sm" />
                <div className="glass-panel p-6 rounded-2xl border border-slate-200 glass-panel-hover space-y-2 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-slate-900">{edu.degree}</h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium">{edu.institution}</p>
                  <p className="text-xs font-mono font-bold text-blue-600 pt-1">{edu.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
