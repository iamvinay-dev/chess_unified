import * as React from 'react';
import { Scale, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-xs mb-4 bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
            <Scale size={14} /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.85]">
            Terms & <span className="text-primary italic">Conditions</span>
          </h1>
          <p className="text-gray-400 font-medium">Last updated: April 2025</p>
        </div>

        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border shadow-2xl shadow-black/5 space-y-12">
          <section className="space-y-4 flex flex-col items-start">
            <h2 className="text-2xl md:text-3xl font-black text-black">1. Acceptance of Terms</h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              By utilizing the Chess Unified platform, attending our camps, exploring our content, or enrolling in our curriculum, you firmly agree to be bound by the directives outlined in these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-black">2. Enrollment & Financials</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-1" />
                <span className="text-gray-500 font-medium">An enrollment slot is purely tentative until the requisite initiation fee payment has been confirmed.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-1" />
                <span className="text-gray-500 font-medium">Fee structures are highly curated and subject to seasonal adjustments; any ongoing changes will be relayed transparently.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4 flex flex-col items-start">
             <h2 className="text-2xl md:text-3xl font-black text-black">3. Conduct Requirements</h2>
             <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />
                <span className="text-gray-500 font-medium">Candidates must maintain uncompromised punctuality and regular attendance.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />
                <span className="text-gray-500 font-medium">Respectful behavior towards certified trainers, parents, and fellow chess players is unequivocally mandatory.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-1" />
                <span className="text-gray-500 font-medium">Management reserves immediate rights to dismantle an enrollment permanently without refund in cases of severe code-of-conduct breaches.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4 flex flex-col items-start">
            <h2 className="text-2xl md:text-3xl font-black text-black">4. Refund Architecture</h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              Refund provisions are conditionally approved strictly reliant on the policy presented actively during enrollment configuration. Specialized setups such as the Summer Grandmaster Camp possess strict non-refundable clauses once the syllabus commences.
            </p>
          </section>
          
          <section className="space-y-4 flex flex-col items-start">
            <h2 className="text-2xl md:text-3xl font-black text-black">5. Media Documentation</h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              We frequently document live sessions, matches, and victory events photographically to highlight our champions across our social networks. By initializing enrollment, you consent to media capturing implicitly, inherently waiving exclusivity unless you issue written objections prior.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100 mt-12 bg-gray-50 rounded-2xl p-6">
            <h2 className="text-lg font-black text-black mb-2">Legal Support Contact</h2>
            <p className="text-gray-500 font-medium">
              Direct any legal or policy interrogatives to our official channel: <a href="mailto:chessunified1@gmail.com" className="text-primary font-bold hover:underline">chessunified1@gmail.com</a>. Voice inquiries are accepted at +91 98850 06568.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
