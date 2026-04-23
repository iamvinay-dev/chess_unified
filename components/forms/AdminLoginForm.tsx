'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export function AdminLoginForm() {
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-5 rounded-3xl text-primary">
            <Lock className="h-10 w-10" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">Admin Portal</h2>
        <p className="text-gray-500 text-center mb-10 text-sm">Enter your credentials to manage the website.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 mb-6 text-sm font-medium border border-red-100">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>Invalid credentials. Please try again.</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Verifying...
              </>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm font-bold text-gray-400 hover:text-primary transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}

