'use client';

import * as React from 'react';
import {
  Save,
  Loader2,
  CheckCircle2,
  Layout,
  Phone,
  Eye,
  Box,
  Star,
  ShoppingBag,
  ListChecks,
  Info,
  Trash2,
  ArrowRight,
  Plus,
  Image as ImageIcon,
  Heart,
} from 'lucide-react';
import { CloudinaryUpload } from '@/components/admin/CloudinaryUpload';
import { cn } from '@/lib/utils';
import { SiteContent } from '@/lib/types';

export default function EditSitePage() {
  const [data, setData] = React.useState<SiteContent | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/data/site')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch site data:', err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch('/api/data/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-red-50 rounded-[2.5rem] border border-red-100">
        <h2 className="text-xl font-bold text-red-600 mb-2">Failed to load site data</h2>
        <p className="text-gray-500 mb-6">There was an issue connecting to the database.</p>
        <button onClick={() => window.location.reload()} className="bg-primary text-white px-6 py-2 rounded-xl font-bold transition-all hover:scale-105">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between relative lg:sticky lg:top-0 bg-gray-50/80 backdrop-blur-md py-4 z-20 border-b gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Edit Site Content</h1>
          <p className="text-xs md:text-sm text-gray-500">Customize text, images, and visibility.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto bg-primary text-white px-6 md:px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {success ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Brand Identity */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-6 md:mb-8 text-primary">
              <Box size={20} className="md:w-6 md:h-6" />
              <h2 className="text-lg md:text-xl font-bold">Brand Identity</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Site Logo</label>
                <CloudinaryUpload
                  onUpload={(url) => setData({ ...data, logoUrl: url })}
                  label="Upload Logo"
                  value={data.logoUrl}
                />
                {data.logoUrl && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-2xl border w-40 h-40 flex items-center justify-center overflow-hidden">
                    <img src={data.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Special Camps Management */}
          <section className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <Star size={24} />
              <h2 className="text-xl font-bold">Special Camps</h2>
            </div>
            <div className="space-y-8">
              {(data.specialCamps || []).map((camp, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-[2rem] border relative space-y-4">
                  <button
                    onClick={() => {
                      const newCamps = [...(data.specialCamps || [])];
                      newCamps.splice(idx, 1);
                      setData({ ...data, specialCamps: newCamps });
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-xl scale-75 hover:scale-90 transition-transform"
                  >
                    Remove
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Camp Title</label>
                      <input
                        className="w-full bg-white border rounded-xl px-4 py-2 outline-none focus:border-primary text-sm font-bold"
                        value={camp.title}
                        onChange={(e) => {
                          const newCamps = [...(data.specialCamps || [])];
                          newCamps[idx].title = e.target.value;
                          setData({ ...data, specialCamps: newCamps });
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Date / Duration</label>
                      <input
                        className="w-full bg-white border rounded-xl px-4 py-2 outline-none focus:border-primary text-sm font-bold"
                        value={camp.date}
                        onChange={(e) => {
                          const newCamps = [...(data.specialCamps || [])];
                          newCamps[idx].date = e.target.value;
                          setData({ ...data, specialCamps: newCamps });
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Description</label>
                    <textarea
                      rows={2}
                      className="w-full bg-white border rounded-xl px-4 py-2 outline-none focus:border-primary text-xs font-medium leading-relaxed resize-none"
                      value={camp.description}
                      onChange={(e) => {
                        const newCamps = [...(data.specialCamps || [])];
                        newCamps[idx].description = e.target.value;
                        setData({ ...data, specialCamps: newCamps });
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Banner Image</label>
                    <CloudinaryUpload
                      value={camp.bannerUrl}
                      onUpload={(url) => {
                        const newCamps = [...(data.specialCamps || [])];
                        newCamps[idx].bannerUrl = url;
                        setData({ ...data, specialCamps: newCamps });
                      }}
                      label="Upload Banner"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  setData({
                    ...data,
                    specialCamps: [
                      ...(data.specialCamps || []),
                      { title: 'New Camp', date: 'TBD', description: '', bannerUrl: '' }
                    ]
                  });
                }}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                + Add New Special Camp
              </button>
            </div>
          </section>

          {/* Academy Features / Home Highlights */}
          <section className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <ListChecks size={24} />
              <h2 className="text-xl font-bold">Home Highlights (Features)</h2>
            </div>
            <div className="space-y-4">
               <p className="text-xs text-gray-400 mb-4 font-medium italic">These bullets appear in the &apos;Why Chess&apos; or &apos;About&apos; sections to highlight your core offerings.</p>
               {(data.features || []).map((feature, idx) => (
                 <div key={idx} className="flex gap-2">
                   <input
                     className="flex-grow bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-sm font-medium"
                     value={feature}
                     onChange={(e) => {
                       const newFeatures = [...(data.features || [])];
                       newFeatures[idx] = e.target.value;
                       setData({ ...data, features: newFeatures });
                     }}
                   />
                   <button
                     onClick={() => {
                       const newFeatures = [...(data.features || [])];
                       newFeatures.splice(idx, 1);
                       setData({ ...data, features: newFeatures });
                     }}
                     className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                   >
                     <Trash2 size={18} />
                   </button>
                 </div>
               ))}
               <button
                 onClick={() => setData({ ...data, features: [...(data.features || []), 'New Academy Highlight'] })}
                 className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:border-primary hover:text-primary transition-all"
               >
                 + Add Highlight
               </button>
            </div>
          </section>

          {/* Social Media & Connect Section */}
          <section className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-pink-500">
              <Heart size={24} className="fill-current" />
              <h2 className="text-xl font-bold text-gray-900">Social Media Connect Section</h2>
            </div>
            
            {!data.socialMediaSection && (
               <div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl mb-6 text-sm font-bold">
                  Legacy data detected. Please hit &quot;Save All Changes&quot; once to initialize the Social Media structure.
               </div>
            )}
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Instagram Link</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-pink-500 transition-all font-bold text-sm"
                    value={data.socialMediaSection?.instagram || ''}
                    onChange={(e) => setData({ ...data, socialMediaSection: { ...(data.socialMediaSection || {instagram:'', facebook:'', youtube:'', images:[]}), instagram: e.target.value } })}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Facebook Link</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all font-bold text-sm"
                    value={data.socialMediaSection?.facebook || ''}
                    onChange={(e) => setData({ ...data, socialMediaSection: { ...(data.socialMediaSection || {instagram:'', facebook:'', youtube:'', images:[]}), facebook: e.target.value } })}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">YouTube Link</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-red-500 transition-all font-bold text-sm"
                    value={data.socialMediaSection?.youtube || ''}
                    onChange={(e) => setData({ ...data, socialMediaSection: { ...(data.socialMediaSection || {instagram:'', facebook:'', youtube:'', images:[]}), youtube: e.target.value } })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-bold mb-4 text-sm">Social Media Feed Images</h3>
                <p className="text-xs text-gray-500 mb-6">Upload images to display in the social media grid (we recommend 4 images).</p>
                <CloudinaryUpload
                  onUpload={(url) => {
                     const currentImages = data.socialMediaSection?.images || [];
                     setData({
                        ...data,
                        socialMediaSection: {
                           ...(data.socialMediaSection || {instagram:'', facebook:'', youtube:'', images:[]}),
                           images: [...currentImages, url]
                        }
                     });
                  }}
                  label="Add Social Feed Image"
                />
                
                {data.socialMediaSection?.images && data.socialMediaSection.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {data.socialMediaSection.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border group">
                        <img src={img} alt="Social Feed" className="w-full h-full object-cover" />
                        <button
                          onClick={() => {
                            const newImages = [...(data.socialMediaSection?.images || [])];
                            newImages.splice(idx, 1);
                            setData({
                              ...data,
                              socialMediaSection: { ...data.socialMediaSection!, images: newImages }
                            });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:scale-110 transition-transform shadow-md z-10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Merchandise Management */}
          <section className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <ShoppingBag size={24} />
              <h2 className="text-xl font-bold">Merchandise Store</h2>
            </div>
            <div className="space-y-8">
              {(data.merchandise || []).map((item, idx) => (
                <div key={item.id || idx} className="p-8 bg-gray-50 rounded-[2.5rem] border relative space-y-6">
                  <button
                    onClick={() => {
                      const newItems = [...(data.merchandise || [])];
                      newItems.splice(idx, 1);
                      setData({ ...data, merchandise: newItems });
                    }}
                    className="absolute top-6 right-6 bg-red-500 text-white p-2 rounded-xl hover:scale-110 transition-transform shadow-lg z-10"
                  >
                    <Trash2 size={20} />
                  </button>
                  
                  <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Product Name</label>
                          <input
                            className="w-full bg-white border rounded-xl px-4 py-3 outline-none focus:border-primary font-bold shadow-sm"
                            value={item.name}
                            onChange={(e) => {
                              const newItems = [...(data.merchandise || [])];
                              newItems[idx].name = e.target.value;
                              setData({ ...data, merchandise: newItems });
                            }}
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Price (INR)</label>
                          <input
                            className="w-full bg-white border rounded-xl px-4 py-3 outline-none focus:border-primary font-bold shadow-sm"
                            value={item.price}
                            onChange={(e) => {
                              const newItems = [...(data.merchandise || [])];
                              newItems[idx].price = e.target.value;
                              setData({ ...data, merchandise: newItems });
                            }}
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Description</label>
                          <textarea
                            rows={3}
                            className="w-full bg-white border rounded-xl px-4 py-3 outline-none focus:border-primary text-sm font-medium leading-relaxed resize-none shadow-sm"
                            value={item.description}
                            onChange={(e) => {
                              const newItems = [...(data.merchandise || [])];
                              newItems[idx].description = e.target.value;
                              setData({ ...data, merchandise: newItems });
                            }}
                          />
                       </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Product Image</label>
                      <CloudinaryUpload
                        value={item.imageUrl}
                        onUpload={(url) => {
                          const newItems = [...(data.merchandise || [])];
                          newItems[idx].imageUrl = url;
                          setData({ ...data, merchandise: newItems });
                        }}
                        label="Upload Image"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  setData({
                    ...data,
                    merchandise: [
                      ...(data.merchandise || []),
                      { id: Date.now().toString(), name: 'New Item', price: '0', description: '', imageUrl: '' }
                    ]
                  });
                }}
                className="w-full py-6 border-2 border-dashed border-gray-200 rounded-[2.5rem] text-gray-400 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                <Plus size={24} /> Add New Merchandise
              </button>
            </div>
          </section>

          {/* Hero Section */}
          <section className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <Layout size={24} />
              <h2 className="text-xl font-bold">Hero Section</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Headline</label>
                <input
                  className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                  value={data.hero.title}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Sub-headline</label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all resize-none"
                  value={data.hero.description}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Primary CTA Button</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={data.hero.ctaPrimary}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaPrimary: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Secondary CTA Button</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={data.hero.ctaSecondary}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaSecondary: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <Phone size={24} />
              <h2 className="text-xl font-bold">Contact & Socials</h2>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={data.contact.email}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={data.contact.phone}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Address</label>
                <textarea
                  rows={2}
                  className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all resize-none"
                  value={data.contact.address}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, address: e.target.value } })}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Instagram</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={data.contact.instagram}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, instagram: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Facebook</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={data.contact.facebook}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, facebook: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">YouTube Channel</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={data.contact.youtube}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, youtube: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Twitter / X</label>
                  <input
                    className="w-full bg-gray-50 border rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
                    value={data.contact.twitter || ''}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, twitter: e.target.value } })}
                  />
                </div>
              </div>

              <div className="pt-6 border-t font-bold text-gray-400 uppercase text-xs tracking-widest mb-4">Location Images (Address)</div>
              <div className="space-y-4">
                <CloudinaryUpload
                  onUpload={(url) =>
                    setData({
                      ...data,
                      contact: {
                        ...data.contact,
                        locationImages: [...(data.contact.locationImages || []), url],
                      },
                    })
                  }
                  label="Add Location Image"
                />
                <div className="grid grid-cols-4 gap-4">
                  {(data.contact.locationImages || []).map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border group">
                      <img src={img} alt="Location" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowRight size={18} />
                      </div>
                      <button
                        onClick={() =>
                          setData({
                            ...data,
                            contact: {
                              ...data.contact,
                              locationImages: data.contact.locationImages?.filter((_, i) => i !== idx),
                            },
                          })
                        }
                        className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-md scale-75"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Visibility Toggle */}
          <section className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <Eye size={24} />
              <h2 className="text-xl font-bold">Section Visibility</h2>
            </div>
            <div className="space-y-4">
              {(Object.keys(data.sections) as Array<keyof typeof data.sections>).map((section) => (
                <div
                  key={section}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-primary/20 transition-all"
                >
                  <span className="capitalize font-bold text-sm">{section}</span>
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        sections: { ...data.sections, [section]: !data.sections[section] },
                      })
                    }
                    className={cn(
                      'w-12 h-6 rounded-full transition-all relative',
                      data.sections[section] ? 'bg-primary' : 'bg-gray-200'
                    )}
                  >
                    <div
                      className={cn(
                        'absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm',
                        data.sections[section] ? 'right-1' : 'left-1'
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>



          <div className="bg-white p-8 rounded-3xl border shadow-lg">
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 mb-6 text-primary">
              <CheckCircle2 size={16} />
              Admin Master Guide
            </h4>
            <div className="text-xs text-gray-600 leading-relaxed space-y-4">
              <div>
                <strong className="text-gray-900 block mb-1">🏠 Home & About Sections:</strong>
                <p>Edit &apos;Hero Section&apos; for the home banner and &apos;Home Highlights&apos; for the feature list. Toggles in &apos;Section Visibility&apos; control what your customers see first.</p>
              </div>
              <div>
                <strong className="text-gray-900 block mb-1">🛒 Merchandise Store:</strong>
                <p>Admins can add/edit/delete chess sets or books. Changes are persistent and update the live shop immediately.</p>
              </div>
              <div>
                <strong className="text-gray-900 block mb-1">📅 Permanent Changes:</strong>
                <p>Every &apos;Save&apos; updates `lib/data/siteContent.json` permanently. No code deployments needed for text or images.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
