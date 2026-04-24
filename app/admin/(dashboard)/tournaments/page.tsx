'use client';

import * as React from 'react';
import {
  Trophy,
  Plus,
  Edit2,
  Trash2,
  Search,
  Globe,
  Lock,
  ChevronRight,
  Loader2,
  Calendar,
  X,
} from 'lucide-react';
import { CloudinaryUpload } from '@/components/admin/CloudinaryUpload';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Tournament } from '@/lib/types';

export default function AdminTournamentsPage() {
  const [tournaments, setTournaments] = React.useState<Tournament[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [editing, setEditing] = React.useState<Tournament | null>(null);

  // Form State
  const [formData, setFormData] = React.useState<Partial<Tournament>>({
    title: '',
    date: '',
    venue: '',
    ageGroups: '',
    fee: '',
    bannerUrl: '',
    status: 'open',
    description: '',
    registrationLink: '',
  });

  const fetchTournaments = async () => {
    try {
      const res = await fetch('/api/data/tournaments');
      const data = await res.json();
      setTournaments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line
    fetchTournaments();
  }, []);

  const handleOpenModal = (tournament?: Tournament) => {
    if (tournament) {
      setEditing(tournament);
      setFormData(tournament);
    } else {
      setEditing(null);
      setFormData({
        title: '',
        date: '',
        venue: '',
        ageGroups: '',
        fee: '',
        bannerUrl: '',
        status: 'open',
        description: '',
        registrationLink: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch('/api/data/tournaments', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(false);
        fetchTournaments();
      }
    } catch (error) {
      console.error('Failed to save tournament:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tournament?')) {
      try {
        const res = await fetch(`/api/data/tournaments?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) fetchTournaments();
      } catch (error) {
        console.error('Failed to delete tournament:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Tournament Manager</h1>
          <p className="text-gray-500">Add, edit or remove chess events from the website.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all"
        >
          <Plus size={20} /> Create New Event
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b">
          <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border">
            <Search size={20} className="text-gray-400" />
            <input
              placeholder="Search tournaments..."
              className="bg-transparent border-none outline-none w-full text-sm font-medium"
            />
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto text-nowrap">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50/50 text-xs font-bold uppercase tracking-widest text-gray-400">
                <th className="px-8 py-5">Event</th>
                <th className="px-8 py-5">Date & Venue</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Fee</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-nowrap">
              {tournaments.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 relative">
                        {t.bannerUrl ? (
                          <div className="w-full h-full relative">
                            <Image
                              src={t.bannerUrl}
                              alt={t.title}
                              fill
                              className="object-cover rounded-xl"
                            />
                          </div>
                        ) : (
                          <Trophy size={20} />
                        )}
                      </div>
                      <div>
                        <div className="font-bold">{t.title}</div>
                        <div className="text-xs text-gray-400">{t.ageGroups}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold">{t.date}</div>
                    <div className="text-xs text-gray-400 max-w-[200px] truncate">{t.venue}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        t.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      )}
                    >
                      <div
                        className={cn(
                          'w-1.5 h-1.5 rounded-full animate-pulse',
                          t.status === 'open' ? 'bg-green-700' : 'bg-red-700'
                        )}
                      />
                      {t.status}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-primary">₹{t.fee}</div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(t)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y">
          {tournaments.map((t) => (
            <div key={t.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary relative overflow-hidden">
                    {t.bannerUrl ? <Image src={t.bannerUrl} alt={t.title} fill className="object-cover" /> : <Trophy size={16} />}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.title}</div>
                    <div className="text-[10px] text-gray-400">{t.ageGroups}</div>
                  </div>
                </div>
                <div
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider',
                    t.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  )}
                >
                  {t.status}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[11px] text-gray-500 font-medium">
                  <Calendar size={12} className="inline mr-1" /> {t.date}
                  <div className="mt-1 opacity-70 truncate max-w-[150px]">{t.venue}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(t)} className="p-2 bg-gray-50 rounded-lg text-gray-400"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 bg-red-50 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center gap-3 text-gray-400">
            <Trophy size={48} className="opacity-20" />
            <div className="font-medium">No tournaments found.</div>
          </div>
        )}

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b flex items-center justify-between">
              <h3 className="text-2xl font-bold">{editing ? 'Edit' : 'Create'} Tournament</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Title
                  </label>
                  <input
                    required
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Venue
                </label>
                <input
                  required
                  className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Registration Link (Optional)
                </label>
                <input
                  className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                  placeholder="https://docs.google.com/forms/..."
                  value={formData.registrationLink || ''}
                  onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Age Groups
                  </label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    placeholder="e.g. Under 14, 18"
                    value={formData.ageGroups}
                    onChange={(e) => setFormData({ ...formData, ageGroups: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Fee (INR)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                  />
                </div>
              </div>

              <CloudinaryUpload
                label="Tournament Banner"
                value={formData.bannerUrl}
                onUpload={(url) => setFormData({ ...formData, bannerUrl: url })}
              />

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Status
                </label>
                <div className="flex gap-4">
                  {['open', 'closed'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: s as 'open' | 'closed' })}
                      className={cn(
                        'flex-1 py-3 rounded-xl border font-bold capitalize transition-all',
                        formData.status === s
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                          : 'bg-gray-50 border-gray-100 text-gray-400'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 font-bold text-gray-400 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {editing ? 'Update' : 'Create'} Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
