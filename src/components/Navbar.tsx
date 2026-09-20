'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Box, Settings, Globe, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Only show the admin button if logged in with the owner's authorized email
    const checkAdmin = () => {
      if (typeof window !== 'undefined') {
        const loggedIn = localStorage.getItem('portfolio_admin_logged_in') === 'true';
        const email = localStorage.getItem('portfolio_admin_email')?.toLowerCase().trim();
        const allowed = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'nasateja4@gmail.com').toLowerCase().trim();
        setIsAdminLoggedIn(loggedIn && (!email || email === allowed));
      }
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAdmin);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[1px] shadow-sm">
            <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-all duration-300">
              <Box className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              Ravi Teja <span className="text-blue-600 text-xs px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 font-semibold">CAD</span>
            </span>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-medium">Mechanical Engineer</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-6 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-blue-600 transition-colors duration-200 relative py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Live Engineering Tool Link */}
          <a
            href="https://fastenersstandards.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-800 hover:bg-cyan-100 transition-all shadow-sm"
            title="Fasteners Standards — Engineering Reference & CAD Tool"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-600" />
            <span>FastenersStandards.com</span>
            <ExternalLink className="w-3 h-3 text-cyan-500" />
          </a>

          {/* Admin CMS Access Button (Only visible to the logged-in owner, completely hidden for all visitors) */}
          {isAdminLoggedIn && (
            <Link
              href="/admin"
              className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-400 hover:bg-blue-100 text-blue-700 transition-all duration-200 shadow-sm"
              title="Manage Projects & 3D Models"
            >
              <Settings className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin CMS</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-5 mt-2 space-y-4 shadow-lg">
          <div className="flex flex-col space-y-3 text-base font-medium text-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-1.5 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://fastenersstandards.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-1.5 text-cyan-700 font-semibold"
            >
              <Globe className="w-4 h-4" />
              <span>FastenersStandards.com ↗</span>
            </a>
          </div>
          {isAdminLoggedIn && (
            <div className="pt-3 border-t border-slate-200">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Admin Management Portal</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
