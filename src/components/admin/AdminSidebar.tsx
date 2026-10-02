'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  Calendar,
  Users,
  UserCheck,
  Star,
  Image,
  Settings,
  Store,
  Receipt,
  LogOut,
  Table,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open = false, onClose }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Day Schedule', href: '/admin', icon: Table },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { name: 'Patient Records', href: '/admin/patients', icon: Users },
    { name: 'Treatments & Pricing', href: '/admin/treatments', icon: Receipt },
    { name: 'Doctors & Chairs', href: '/admin/doctors', icon: UserCheck },
    { name: 'Google Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Clinic Gallery', href: '/admin/gallery', icon: Image },
    { name: 'Clinic Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-surface-container-low flex flex-col py-5 shadow-2xl lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/30 transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header with Mobile Close Button */}
        <div className="px-5 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo variant="icon" className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-primary leading-tight">Tooth Story</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                Desk Operations
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl bg-surface text-on-surface-variant hover:text-primary border border-outline-variant/30 transition-colors"
            aria-label="Close Staff Navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shift Active Badge */}
        <div className="px-4 mb-4">
          <div className="p-3 rounded-2xl bg-surface-container-lowest flex items-center gap-2.5 shadow-xs border border-outline-variant/20">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface">Shift Active</span>
              <span className="text-[11px] text-outline">Reception • Till 10 PM</span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className={`w-4 h-4 ${active ? 'text-white' : 'text-primary'}`} />
                  <span>{item.name}</span>
                </div>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-outline-variant/20 mt-2">
            <Link
              href="/"
              target="_blank"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-semibold text-outline hover:text-primary hover:bg-surface-container transition-colors"
            >
              <Store className="w-4 h-4 text-outline" />
              <span>Open Public Site</span>
            </Link>
          </div>
        </nav>

        {/* User Footer with Profile & Logout */}
        <div className="px-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={
                user?.avatar ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBggQvQaQanLBY4HYRI03lflWviQkSmLO3JOMgsxy7RbpINpkG-d9IJQq1QfwwyAtLiBLtC5j1297Fk3XL2O1rc4mbo5r5toLuTKk7WLmPYgzrmAtk9HuABAQvsY4u88WpH2a08n4NI31W2zAPDnEZ9lMwO6Pcxtr0o-uSnY7wxvLyjaPZ1OC7VccL44nx-lV_kAjzYoZNIZXWjA7n_bXy4qT6ghqKuVFTHKtGlcIlYvdzzv29U09xz2g'
              }
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-on-surface truncate">
                {user?.displayName || 'Reception Staff'}
              </span>
              <span className="text-[10px] text-secondary font-bold">Online</span>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 rounded-xl hover:bg-surface-container text-outline hover:text-error transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
