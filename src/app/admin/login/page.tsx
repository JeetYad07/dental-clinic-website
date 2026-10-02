'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';
import {
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, loginDemo } = useAuth();
  const [email, setEmail] = useState('admin@toothstory.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginDemo();
      router.push('/admin');
    } catch (err: any) {
      setError(err?.message || 'Unable to start demo session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-8 shadow-2xl border border-outline-variant/30 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex justify-center mb-2">
            <Logo variant="icon" className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-extrabold text-primary">Clinic Staff Portal</h1>
          <p className="text-xs text-on-surface-variant">
            Tooth Story Dental Clinic • Reception & Administration
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-error-container text-on-error-container text-xs flex items-center gap-2 border border-error/20">
            <AlertCircle className="w-4 h-4 text-error shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant">Staff Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-outline" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@toothstory.com"
                required
                className="w-full h-12 rounded-xl bg-surface-container-low pl-10 pr-3 text-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-on-surface-variant">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-outline" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-12 rounded-xl bg-surface-container-low pl-10 pr-3 text-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Login */}
        <div className="pt-4 border-t border-outline-variant/30 space-y-3">
          <button
            type="button"
            onClick={handleDemoClick}
            disabled={loading}
            className="w-full h-11 rounded-xl bg-secondary-container/60 hover:bg-secondary-container text-on-secondary-container font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>1-Click Receptionist Demo Login</span>
          </button>

          <p className="text-[11px] text-center text-outline">
            Protected under clinic access control. Unauthorized access is monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
