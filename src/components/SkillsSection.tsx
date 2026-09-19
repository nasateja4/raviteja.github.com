'use client';

import { useState } from 'react';
import { Layers, Cpu, Printer, Code2, CheckCircle2 } from 'lucide-react';
import { SkillCategory } from '@/lib/types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const getIcon = (category: string) => {
    if (category.includes('Design') || category.includes('CAD')) return <Layers className="w-5 h-5 text-blue-600" />;
    if (category.includes('Simulation') || category.includes('CAE')) return <Cpu className="w-5 h-5 text-indigo-600" />;
    if (category.includes('Prototyping') || category.includes('Manufacturing')) return <Printer className="w-5 h-5 text-cyan-600" />;
    return <Code2 className="w-5 h-5 text-emerald-600" />;
  };

  return (
    <section id="skills" className="py-20 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Core Competencies
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 mt-4 mb-4">
          Technical Expertise & Tooling
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Proven proficiency across the complete electro-mechanical product lifecycle: from initial CAD ideation, parametric SolidWorks models, FEA analysis, to physical CNC fabrication, 3D printing, and automation scripting.
        </p>
      </div>

      {/* Category Pills Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm ${
              activeTab === idx
                ? 'bg-blue-600 text-white shadow-md border border-transparent'
                : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            {getIcon(cat.category)}
            <span>{cat.category}</span>
          </button>
        ))}
      </div>

      {/* Selected Category Skill Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {categories[activeTab]?.skills.map((skill, i) => (
          <div
            key={i}
            className="glass-panel p-5 rounded-xl border border-slate-200 flex items-center justify-between glass-panel-hover bg-white"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-slate-800 font-semibold text-sm sm:text-base">{skill.name}</span>
            </div>
            {skill.level && (
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 uppercase">
                {skill.level}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
