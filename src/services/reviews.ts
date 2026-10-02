import { Review } from '@/types';
import { INITIAL_REVIEWS } from '@/lib/seed-data';

const REVIEWS_KEY = 'tooth_story_reviews_v1';

export async function getReviews(): Promise<Review[]> {
  if (typeof window === 'undefined') return INITIAL_REVIEWS;
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_REVIEWS;
  }
}

export async function addReview(data: Omit<Review, 'id'>): Promise<Review> {
  const id = `rev-${Date.now()}`;
  const newReview: Review = { ...data, id };
  const current = await getReviews();
  if (typeof window !== 'undefined') {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify([newReview, ...current]));
  }
  return newReview;
}
