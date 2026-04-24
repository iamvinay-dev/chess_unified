import * as React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-xs mb-4 bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
            <ShieldCheck size={14} /> Data Protection
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.85]">
            Privacy <span className="text-primary italic">Policy</span>
          </h1>
          <p className="text-gray-400 font-medium">Last updated: April 2025</p>
        </div>

        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border shadow-2xl shadow-black/5 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-black">1. Information We Collect</h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              We collect information that you explicitly provide to us when inquiring or enrolling through our forms. This includes your name, phone number, email address, and your child&apos;s age bracket. This data is leveraged strictly to facilitate our chess educational services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-black">2. How We Use It</h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              Your contact data is exclusively utilized to process enrollments, dispatch updates regarding tournaments and special camps, and optimize your overall experience. <strong className="text-black">We do absolutely not sell or rent</strong> your personal data to external third-party agencies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-black">3. WhatsApp Communication</h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              By submitting an enrollment form on our site, your details are tunneled directly into an encrypted WhatsApp chat gateway to connect you with our agents rapidly. You implicitly grant consent to communicating directly with our staff via this medium.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-black">4. Children&apos;s Privacy Guidelines</h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              We explicitly collect scheduling and enrollment data strictly through parents or legal guardians. We never knowingly prompt or aggregate data directly from children without legally bound supervision.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-lg font-black text-black mb-2">Questions regarding this policy?</h2>
            <p className="text-gray-500 font-medium">
              Email us at <a href="mailto:chessunified1@gmail.com" className="text-primary font-bold hover:underline">chessunified1@gmail.com</a> or call the head office at +91 98850 06568.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
