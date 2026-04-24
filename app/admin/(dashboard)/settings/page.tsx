'use client';

import * as React from 'react';
import { Settings, Shield, Bell, RefreshCw, Loader2, Save, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 4) {
      setMessage({ type: 'error', text: 'Password must be at least 4 characters long' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Password updated successfully' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-5xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">System Settings</h1>
        <p className="text-gray-500">Manage your administrative credentials and site-wide configurations.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm space-y-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Shield size={24} />
            </div>
            <h2 className="text-xl font-bold">Admin Credentials</h2>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            {message && (
              <div className={cn(
                "p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border animate-in fade-in slide-in-from-top-2 duration-300",
                message.type === 'success' ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-600 border-red-100"
              )}>
                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                {message.text}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Current Password</label>
              <div className="relative">
                <input 
                  required
                  type={showCurrent ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 outline-none focus:border-primary transition-all shadow-sm pr-12"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">New Password</label>
              <div className="relative">
                <input 
                  required
                  type={showNew ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 outline-none focus:border-primary transition-all shadow-sm pr-12"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Confirm New Password</label>
              <div className="relative">
                <input 
                  required
                  type={showConfirm ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 outline-none focus:border-primary transition-all shadow-sm pr-12"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              disabled={saving}
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" /> : <RefreshCw size={18} />}
              Update Credentials
            </button>
          </form>
        </section>

        <div className="space-y-8">
          <section className="bg-primary/5 p-8 md:p-10 rounded-[2.5rem] border border-primary/10">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
               <Shield size={18} className="text-primary" /> 
               Security Tip
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              We recommend using a strong password that you don&apos;t use anywhere else. Your credentials are encrypted during transmission but stored securely on our servers for authentication.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
