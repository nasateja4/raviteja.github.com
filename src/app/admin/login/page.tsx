'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

const ALLOWED_ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'nasateja4@gmail.com').toLowerCase().trim();

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const inputEmail = email.trim().toLowerCase();
    if (!inputEmail || !password) {
      setError('Please enter your administrator email and password.');
      return;
    }

    // STRICT OWNER CHECK: Only allow the portfolio owner's email
    if (inputEmail !== ALLOWED_ADMIN_EMAIL) {
      setError(`Access Denied: Only the portfolio owner (${ALLOWED_ADMIN_EMAIL}) is authorized to access the Admin CMS.`);
      return;
    }

    setLoading(true);

    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, inputEmail, password);
        const authedEmail = userCredential.user?.email?.toLowerCase().trim();
        
        if (authedEmail !== ALLOWED_ADMIN_EMAIL) {
          await auth.signOut();
          localStorage.removeItem('portfolio_admin_logged_in');
          localStorage.removeItem('portfolio_admin_email');
          setError(`Access Denied: Account ${authedEmail} is not authorized for administrator privileges.`);
          setLoading(false);
          return;
        }

        localStorage.setItem('portfolio_admin_logged_in', 'true');
        localStorage.setItem('portfolio_admin_email', ALLOWED_ADMIN_EMAIL);
        router.push('/admin');
      } catch (err: any) {
        setError(err.message || 'Authentication failed. Please verify credentials.');
      } finally {
        setLoading(false);
      }
    } else {
      // Local fallback mode when Firebase Auth is not active
      localStorage.setItem('portfolio_admin_logged_in', 'true');
      localStorage.setItem('portfolio_admin_email', ALLOWED_ADMIN_EMAIL);
      router.push('/admin');
      setLoading(false);
    }
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
            Secure owner management for projects, 3D CAD models, and portfolio content.
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
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Authorized Owner Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nasateja4@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                required
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In as Owner'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
