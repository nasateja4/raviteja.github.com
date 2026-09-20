'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { ShieldAlert, ArrowLeft, KeyRound, Lock, Mail, X, CheckCircle2, AlertCircle } from 'lucide-react';

const ALLOWED_ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'nasateja4@gmail.com').toLowerCase().trim();

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Modal Login Form State
  const [email, setEmail] = useState(ALLOWED_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};

    const verifyCurrentSession = () => {
      if (typeof window === 'undefined') return;

      const localLoggedIn = localStorage.getItem('portfolio_admin_logged_in') === 'true';
      const localEmail = localStorage.getItem('portfolio_admin_email')?.toLowerCase().trim();

      if (isFirebaseConfigured && auth) {
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user && user.email) {
            const currentEmail = user.email.toLowerCase().trim();
            if (currentEmail === ALLOWED_ADMIN_EMAIL) {
              localStorage.setItem('portfolio_admin_logged_in', 'true');
              localStorage.setItem('portfolio_admin_email', ALLOWED_ADMIN_EMAIL);
              setIsAuthorized(true);
            } else {
              localStorage.removeItem('portfolio_admin_logged_in');
              localStorage.removeItem('portfolio_admin_email');
              setIsAuthorized(false);
            }
          } else if (localLoggedIn && localEmail === ALLOWED_ADMIN_EMAIL) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
          setCheckingAuth(false);
        });
      } else {
        if (localLoggedIn && localEmail === ALLOWED_ADMIN_EMAIL) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
        setCheckingAuth(false);
      }
    };

    verifyCurrentSession();
    return () => unsubscribe();
  }, []);

  // Google 1-Tap Sign-In Handler
  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthLoading(true);

    if (!isFirebaseConfigured || !auth) {
      setAuthError('Firebase is not configured in this environment.');
      setAuthLoading(false);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user?.email?.toLowerCase().trim();

      if (userEmail !== ALLOWED_ADMIN_EMAIL) {
        await signOut(auth);
        localStorage.removeItem('portfolio_admin_logged_in');
        localStorage.removeItem('portfolio_admin_email');
        setIsAuthorized(false);
        setAuthError(`Access Denied: Account "${userEmail}" is not authorized. Only the portfolio owner (${ALLOWED_ADMIN_EMAIL}) has access.`);
        setAuthLoading(false);
        return;
      }

      localStorage.setItem('portfolio_admin_logged_in', 'true');
      localStorage.setItem('portfolio_admin_email', ALLOWED_ADMIN_EMAIL);
      setIsAuthorized(true);
      setShowAuthModal(false);
    } catch (err: any) {
      if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
        setAuthError('Google Sign-In is not enabled yet in your Firebase Console. Please use your Owner Password below, or enable Google in Firebase Console > Authentication > Sign-in method.');
      } else {
        setAuthError(err.message || 'Google sign-in failed. Please try password login.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Email & Password Sign-In Handler
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const inputEmail = email.trim().toLowerCase();
    if (!inputEmail || !password) {
      setAuthError('Please enter both your email and password.');
      return;
    }

    if (inputEmail !== ALLOWED_ADMIN_EMAIL) {
      setAuthError(`Access Denied: Only ${ALLOWED_ADMIN_EMAIL} is authorized.`);
      return;
    }

    setAuthLoading(true);

    if (isFirebaseConfigured && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, inputEmail, password);
        const signedEmail = cred.user?.email?.toLowerCase().trim();

        if (signedEmail !== ALLOWED_ADMIN_EMAIL) {
          await signOut(auth);
          localStorage.removeItem('portfolio_admin_logged_in');
          localStorage.removeItem('portfolio_admin_email');
          setIsAuthorized(false);
          setAuthError(`Access Denied: Account ${signedEmail} is not authorized.`);
          setAuthLoading(false);
          return;
        }

        localStorage.setItem('portfolio_admin_logged_in', 'true');
        localStorage.setItem('portfolio_admin_email', ALLOWED_ADMIN_EMAIL);
        setIsAuthorized(true);
        setShowAuthModal(false);
      } catch (err: any) {
        if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
          // Firebase Authentication is not yet toggled on in the Firebase Console.
          // Allow owner access with owner email & password so the owner is never locked out!
          const requiredPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
          if (requiredPass && password !== requiredPass) {
            setAuthError('Incorrect administrator password.');
            setAuthLoading(false);
            return;
          }
          localStorage.setItem('portfolio_admin_logged_in', 'true');
          localStorage.setItem('portfolio_admin_email', ALLOWED_ADMIN_EMAIL);
          setIsAuthorized(true);
          setShowAuthModal(false);
        } else {
          setAuthError(err.message || 'Authentication failed. Please verify credentials.');
        }
      } finally {
        setAuthLoading(false);
      }
    } else {
      // Local development fallback
      localStorage.setItem('portfolio_admin_logged_in', 'true');
      localStorage.setItem('portfolio_admin_email', ALLOWED_ADMIN_EMAIL);
      setIsAuthorized(true);
      setShowAuthModal(false);
      setAuthLoading(false);
    }
  };

  // Loading state while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-500">Verifying administrator security token...</p>
      </div>
    );
  }

  // 403 ACCESS DENIED SCREEN (when not authenticated as the owner)
  if (!isAuthorized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full glass-panel bg-white p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-2xl space-y-6 text-center relative overflow-hidden">
          {/* Ambient Security Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-100/60 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center mx-auto text-white shadow-lg shadow-rose-500/20 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-mono font-bold tracking-wider uppercase">
              <span>403 Forbidden • Protected Area</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Access Denied
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This terminal is strictly restricted to the portfolio administrator. You do not have permission to view or modify this workspace.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Portfolio</span>
            </Link>

            {/* Discrete Owner Unlock Trigger */}
            <button
              onClick={() => {
                setAuthError('');
                setShowAuthModal(true);
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold text-xs transition-all active:scale-95"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
              <span>Owner Login</span>
            </button>
          </div>

          {/* OWNER AUTHENTICATION MODAL */}
          {showAuthModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
              <div className="max-w-md w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 relative text-left space-y-4 max-h-[92vh] overflow-y-auto my-auto">
                {/* Close Button */}
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all z-10"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-mono font-bold uppercase">
                    <Lock className="w-3 h-3" />
                    <span>Owner Portal</span>
                  </div>
                  <h2 className="text-xl font-display font-bold text-slate-900">
                    Administrator Authentication
                  </h2>
                  <p className="text-xs text-slate-500">
                    Sign in with authorized account <span className="font-semibold text-slate-800">{ALLOWED_ADMIN_EMAIL}</span>
                  </p>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 leading-relaxed">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* 1. Google 1-Tap Login Button */}
                {isFirebaseConfigured && (
                  <div className="space-y-3">
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={authLoading}
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Sign in with Google</span>
                    </button>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200" />
                      <span className="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-mono">
                        Or with credentials
                      </span>
                      <div className="flex-grow border-t border-slate-200" />
                    </div>
                  </div>
                )}

                {/* 2. Email & Password Form */}
                <form onSubmit={handleEmailSignIn} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Owner Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                        placeholder="nasateja4@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {authLoading ? 'Authenticating...' : 'Sign In & Access CMS'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render Admin Dashboard / Subpages for Authorized Owner
  return <>{children}</>;
}
