'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isFirebaseConfigured && auth) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('portfolio_admin_logged_in', 'true');
        router.push('/admin');
      } catch (err: any) {
        setError(err.message || 'Authentication failed. Please verify credentials.');
      } finally {
        setLoading(false);
      }
    } else {
      if (email && password) {
        localStorage.setItem('portfolio_admin_logged_in', 'true');
        router.push('/admin');
      } else {
        setError('Please enter your administrator email and password.');
      }
      setLoading(false);
    }
  };

  const handleQuickDemoAccess = () => {
    localStorage.setItem('portfolio_admin_logged_in', 'true');
    router.push('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full glass-panel bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center mx-auto text-white shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Admin CMS Portal</h1>
          <p className="text-xs text-slate-500">
            Secure management for projects, 3D CAD models, and portfolio content.
          </p>
        </div>

        {/* Backend status alert */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">Backend Status:</span>
          <span className={`font-mono font-bold px-2 py-0.5 rounded ${isFirebaseConfigured ? 'text-emerald-700 bg-emerald-100' : 'text-amber-700 bg-amber-100'}`}>
            {isFirebaseConfigured ? '● Firebase Active' : '● Local Admin Mode'}
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@raviteja.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Testing Access */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            onClick={handleQuickDemoAccess}
            type="button"
            className="text-xs text-blue-600 hover:underline font-semibold flex items-center justify-center gap-1.5 mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Admin Access (Local / Offline Mode)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
