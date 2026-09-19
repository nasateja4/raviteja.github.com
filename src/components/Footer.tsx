'use client';

import { Mail, Phone, MapPin, Linkedin, Github, Box } from 'lucide-react';
import { ProfileData } from '@/lib/types';

interface FooterProps {
  profile?: ProfileData;
}

export default function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative border-t border-slate-200 bg-white/90 backdrop-blur-md pt-16 pb-12 overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Bio / Brand */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-sm">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900">Ravi Teja Chevuri</span>
            </div>
            <p className="text-slate-600 text-sm max-w-md leading-relaxed">
              Mechanical Design Engineer specializing in CAD modeling, 3D prototyping, automation scripts, and electromechanical systems. Open for full-time roles, engineering consultations, and prototyping collaborations.
            </p>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wider">Contact Direct</h4>
            <div className="space-y-2 text-sm text-slate-600">
              <a
                href="mailto:nasateja4@gmail.com"
                className="flex items-center gap-2.5 hover:text-blue-600 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>nasateja4@gmail.com</span>
              </a>
              <a
                href="tel:+917569350964"
                className="flex items-center gap-2.5 hover:text-blue-600 transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+91 7569350964</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-500">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Visakhapatnam, AP, India</span>
              </div>
            </div>
          </div>

          {/* Col 3: Social & Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://github.com/nasateja4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 transition-all shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/ravi-teja-chevuri"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 transition-all shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Visitor Counter & Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Ravi Teja Chevuri. Engineered for performance & hosted on Vercel.</p>

          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-600">Live Portfolio Visitors:</span>
            <img
              src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fravi-teja-4.github.io&label=Visitors&labelColor=%23f1f5f9&countColor=%232563eb&style=flat&labelStyle=upper"
              alt="Visitor Counter"
              className="h-5 rounded border border-slate-200 shadow-sm"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
