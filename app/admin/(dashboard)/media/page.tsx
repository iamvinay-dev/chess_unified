'use client';

import * as React from 'react';
import {
  ImageIcon,
  Trash2,
  Plus,
  Loader2,
  Video,
  PlusCircle,
  ExternalLink,
  X,
} from 'lucide-react';
import { CloudinaryUpload } from '@/components/admin/CloudinaryUpload';
import Image from 'next/image';
import { SiteContent } from '@/lib/types';

export default function MediaManagerPage() {
  const [data, setData] = React.useState<SiteContent | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [newYoutube, setNewYoutube] = React.useState('');

  const fetchData = async () => {
    const res = await fetch('/api/data/site');
    const d = await res.json();
    setData(d);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const saveChanges = async (newData: SiteContent) => {
    setSaving(true);
    await fetch('/api/data/site', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });
    setSaving(false);
    setData(newData);
  };

  const addGalleryItem = (url: string) => {
    if (!url || !data) return;
    const newData = { ...data, gallery: [...data.gallery, url] };
    saveChanges(newData);
  };

  const removeGalleryItem = (url: string) => {
    if (!data) return;
    const newData = { ...data, gallery: data.gallery.filter((item: string) => item !== url) };
    saveChanges(newData);
  };

  const addYoutube = () => {
    if (!newYoutube || !data) return;
    // Extract ID from URL
    let id = newYoutube;
    if (newYoutube.includes('v=')) id = newYoutube.split('v=')[1].split('&')[0];
    else if (newYoutube.includes('be/')) id = newYoutube.split('be/')[1];
    const newData = { ...data, youtubeVideos: [...(data.youtubeVideos || []), id] };
    saveChanges(newData);
    setNewYoutube('');
  };

  const removeYoutube = (id: string) => {
    if (!data) return;
    const newData = { ...data, youtubeVideos: (data.youtubeVideos || []).filter((v: string) => v !== id) };
    saveChanges(newData);
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-4xl font-bold mb-2">Media Library</h1>
        <p className="text-gray-500">Manage your gallery images and YouTube videos.</p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ImageIcon className="text-primary" /> Gallery Images
          </h2>
          {saving && <Loader2 className="animate-spin text-primary" />}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="aspect-square">
            <CloudinaryUpload label="" onUpload={addGalleryItem} />
          </div>
          {data.gallery.map((img: string, idx: number) => (
            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border ">
              <Image src={img} alt="Gallery item" width={200} height={200} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => removeGalleryItem(img)} className="bg-red-500 text-white p-2 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Video className="text-primary" /> YouTube Videos
          </h2>
        </div>

        <div className="flex gap-4">
          <input 
            placeholder="Paste YouTube Link (e.g. https://www.youtube.com/watch?v=...)"
            className="flex-1 bg-white border rounded-xl px-5 py-3 outline-none focus:border-primary transition-all"
            value={newYoutube}
            onChange={(e) => setNewYoutube(e.target.value)}
          />
          <button 
            onClick={addYoutube}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all outline-none"
          >
            <PlusCircle size={20} /> Add Video
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.youtubeVideos || []).map((id) => (
            <div key={id} className="bg-white rounded-3xl border overflow-hidden group relative shadow-sm">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => removeYoutube(id)}
                  className="bg-red-500 text-white p-2 rounded-xl shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {(data.youtubeVideos || []).length === 0 && (
            <div className="col-span-full py-12 text-center border-2 border-dashed rounded-[2.5rem] text-gray-400 font-medium">
              No videos added yet. Paste a link above to start your video library.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
