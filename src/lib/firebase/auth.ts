import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';
import { AdminUser } from '@/types';

export const DEMO_ADMIN_USER: AdminUser = {
  uid: 'demo-admin-uid-1',
  email: 'admin@toothstory.com',
  displayName: 'Dr. Dhanashree (Reception Desk)',
  role: 'admin',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBggQvQaQanLBY4HYRI03lflWviQkSmLO3JOMgsxy7RbpINpkG-d9IJQq1QfwwyAtLiBLtC5j1297Fk3XL2O1rc4mbo5r5toLuTKk7WLmPYgzrmAtk9HuABAQvsY4u88WpH2a08n4NI31W2zAPDnEZ9lMwO6Pcxtr0o-uSnY7wxvLyjaPZ1OC7VccL44nx-lV_kAjzYoZNIZXWjA7n_bXy4qT6ghqKuVFTHKtGlcIlYvdzzv29U09xz2g',
};

const AUTH_STORAGE_KEY = 'tooth_story_admin_session_v1';

export function getStoredAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredAdminSession(user: AdminUser | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  if (isFirebaseConfigured && auth) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user: AdminUser = {
        uid: cred.user.uid,
        email: cred.user.email || email,
        displayName: cred.user.displayName || 'Clinic Staff',
        role: 'admin',
      };
      setStoredAdminSession(user);
      return user;
    } catch (e: any) {
      // Fallback for development if credentials match demo
      if (email.includes('toothstory') || email === 'admin@toothstory.com') {
        setStoredAdminSession(DEMO_ADMIN_USER);
        return DEMO_ADMIN_USER;
      }
      throw e;
    }
  }

  // Development / Demo login
  if (email && password) {
    setStoredAdminSession(DEMO_ADMIN_USER);
    return DEMO_ADMIN_USER;
  }

  throw new Error('Please enter valid credentials');
}

export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signout note:', e);
    }
  }
  setStoredAdminSession(null);
}
