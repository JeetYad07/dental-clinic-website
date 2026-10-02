'use client';

import React, { useState, useEffect } from 'react';
import { getGallery, addGalleryItem } from '@/services/gallery';
import { GalleryItem } from '@/types';
import { Image as ImageIcon, Plus, CheckCircle2, X } from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'operatory' | 'lounge' | 'technology' | 'sterilization'>('operatory');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('Sterile Unit');
  const [toast, setToast] = useState<string | null>(null);

  const fetchItems = async () => {
    const list = await getGallery();
    setItems(list);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    await addGalleryItem({
      title,
      category,
      imageUrl,
      description,
      badge,
    });

    setIsAddOpen(false);
    setTitle('');
    setImageUrl('');
    setDescription('');
    await fetchItems();
    triggerToast(`Added photo to gallery: ${title}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-primary">Clinic Photo Gallery</h1>
          <p className="text-xs text-on-surface-variant">
            Manage operatory ambience photos, sterilization suite views, and equipment assets.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-surface-container-lowest overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-surface-container">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              {item.badge && (
                <span className="absolute top-3 right-3 rounded-full bg-surface/90 px-2.5 py-0.5 text-[10px] font-bold text-primary shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-primary">{item.title}</h3>
              <p className="text-xs text-on-surface-variant line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddItem}
            className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="text-sm font-bold text-primary">Add Gallery Photo</h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1 text-outline"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Photo Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Operatory 02 Micro-RCT Unit"
                  required
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  required
                  className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                  >
                    <option value="operatory">Operatory</option>
                    <option value="lounge">Lounge</option>
                    <option value="technology">Technology</option>
                    <option value="sterilization">Sterilization</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Badge</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Sterile Bay"
                    className="w-full h-10 rounded-xl bg-surface-container-low px-3 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl bg-surface-container-low p-3 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md"
              >
                Save Photo
              </button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-primary text-on-primary shadow-2xl border border-primary-fixed">
            <CheckCircle2 className="w-5 h-5 text-secondary" />
            <span className="text-xs font-bold">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
