import { GalleryItem } from '@/types';
import { INITIAL_GALLERY } from '@/lib/seed-data';

const GALLERY_KEY = 'tooth_story_gallery_v1';

export async function getGallery(): Promise<GalleryItem[]> {
  if (typeof window === 'undefined') return INITIAL_GALLERY;
  try {
    const raw = localStorage.getItem(GALLERY_KEY);
    if (!raw) {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(INITIAL_GALLERY));
      return INITIAL_GALLERY;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_GALLERY;
  }
}

export async function addGalleryItem(data: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  const id = `gal-${Date.now()}`;
  const newItem: GalleryItem = { ...data, id };
  const current = await getGallery();
  if (typeof window !== 'undefined') {
    localStorage.setItem(GALLERY_KEY, JSON.stringify([...current, newItem]));
  }
  return newItem;
}
