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
    const newData = { ...data, youtubeVideos: data.youtubeVideos.filter((v: string) => v !== id) };
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

    </div>
  );
}
