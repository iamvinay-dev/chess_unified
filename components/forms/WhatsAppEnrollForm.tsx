'use client';

import * as React from 'react';
import { Send, MessageCircle } from 'lucide-react';

export function WhatsAppEnrollForm() {
  const [formData, setFormData] = React.useState({
    parentName: '',
    phone: '',
    childAge: '',
    program: 'Beginner',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919885006568';
    const text = `Hi Chess Unified! I'm ${formData.parentName} (Child Age ${formData.childAge}). Interested in ${formData.program}. Phone: ${formData.phone}. Message: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-green-100 p-3 rounded-2xl text-green-600">
          <MessageCircle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Enroll Now</h3>
          <p className="text-gray-500 text-sm">Quick enrollment via WhatsApp</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 uppercase tracking-wider text-gray-500">
            Parent Name
          </label>
          <input
            required
            type="text"
            placeholder="John Doe"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={formData.parentName}
            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            suppressHydrationWarning
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 uppercase tracking-wider text-gray-500">
            Phone Number
          </label>
          <input
            required
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            suppressHydrationWarning
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 uppercase tracking-wider text-gray-500">
            Child&apos;s Age
          </label>
          <input
            required
            type="number"
            placeholder="e.g. 8"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={formData.childAge}
            onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
            suppressHydrationWarning
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1 uppercase tracking-wider text-gray-500">
            Select Program
          </label>
          <select
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={formData.program}
            onChange={(e) => setFormData({ ...formData, program: e.target.value })}
            suppressHydrationWarning
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Early Childhood</option>
            <option>School Program</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold ml-1 uppercase tracking-wider text-gray-500">
          Additional Message (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Anything else you'd like us to know?"
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        suppressHydrationWarning
      >
        Send via WhatsApp <Send className="h-5 w-5" />
      </button>

      <p className="text-center text-xs text-gray-400 px-4">
        By clicking &quot;Send via WhatsApp&quot;, you&apos;ll be redirected to chat with our
        admissions team.
      </p>
    </form>
  );
}
