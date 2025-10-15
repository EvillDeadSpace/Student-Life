"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LinkComponents from "./Link";
import UserAuth from "./UserAuth";
import { 
  HomeIcon,
  XMarkIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";

export default function MobileMenuToggle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if component is mounted (client-side)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className='md:hidden'>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='relative group p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-blue-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500'
        aria-label={isMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
      >
        {/* Glow effect on hover */}
        <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10'></div>
        
        {isMenuOpen ? (
          <XMarkIcon className='h-6 w-6 transform group-hover:rotate-90 transition-transform duration-300' />
        ) : (
          <Bars3Icon className='h-6 w-6 transform group-hover:scale-110 transition-transform duration-300' />
        )}
      </button>

      {/* Mobile Menu Overlay - rendered via Portal */}
      {mounted && isMenuOpen && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fadeInUp'
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className='fixed top-0 left-0 right-0 bottom-0 z-[9999] animate-fadeInUp pt-16'>
            <div className='h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-2xl overflow-y-auto'>
              {/* Gradient header */}
              <div className='sticky top-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500'></div>
              
              <div className='px-4 py-6 space-y-2'>
                {/* Welcome message with icon */}
                <div className='mb-6 p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center'>
                      <HomeIcon className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <p className='font-bold text-gray-900 dark:text-white'>Navigacija</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>Brza navigacija kroz sajt</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links with Icons */}
                <div className='space-y-2'>
                  <div className='relative' onClick={() => setIsMenuOpen(false)}>
                    <LinkComponents
                      href='/'
                      text='Pocetna'
                      isMobile={true}
                      isActive={true}
                    />
                  </div>

                  <div className='relative' onClick={() => setIsMenuOpen(false)}>
                    <LinkComponents
                      href='/kategorije'
                      text='Kategorije'
                      isMobile={true}
                    />
                  </div>

                  <div className='relative' onClick={() => setIsMenuOpen(false)}>
                    <LinkComponents
                      href='/dodaj-iskustvo'
                      text='Dodaj iskustvo'
                      isMobile={true}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className='my-6 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent'></div>

                {/* User Auth Section */}
                <div className='p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700'>
                  <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3'>
                    Korisnički nalog
                  </p>
                  <div onClick={() => setIsMenuOpen(false)}>
                    <UserAuth />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className='mt-6 grid grid-cols-2 gap-3'>
                  <div className='p-3 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border border-teal-200 dark:border-teal-800'>
                    <p className='text-2xl font-black bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent'>5k+</p>
                    <p className='text-xs font-medium text-gray-600 dark:text-gray-400'>Studenata</p>
                  </div>
                  <div className='p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800'>
                    <p className='text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>1k+</p>
                    <p className='text-xs font-medium text-gray-600 dark:text-gray-400'>Priča</p>
                  </div>
                </div>

                {/* Footer gradient */}
                <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700'>
                  <div className='flex items-center justify-center gap-2'>
                    <div className='h-1 w-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500'></div>
                    <div className='h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500'></div>
                    <div className='h-1 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500'></div>
                  </div>
                  <p className='text-center text-xs text-gray-500 dark:text-gray-400 mt-4'>
                    Student Life © 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
