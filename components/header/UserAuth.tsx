// components/header/UserAuth.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { getUserFromStorage, type User } from "../../lib/api";
import Link from "next/link";
import { removeUserFromStorage } from "@/lib/Auth";
import { useRouter } from "next/navigation";
import { 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function UserAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserFromStorage();
    setUser(userData);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const handleLogout = () => {
    removeUserFromStorage();
    setUser(null);
    setOpen(false);
    router.push("/");
  };

  if (!user) {
    return (
      <Link 
        href='/login'
        className='group relative px-4 py-2 rounded-lg font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105'
      >
        {/* Gradient background */}
        <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500'></div>
        <div className='absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        
        {/* Shine effect */}
        <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12'></div>
        
        {/* Text */}
        <span className='relative text-white flex items-center gap-2'>
          <UserCircleIcon className='w-5 h-5' />
          Login
        </span>
        
        {/* Glow effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 blur-lg opacity-50 -z-10 group-hover:opacity-75 transition-opacity duration-300'></div>
      </Link>
    );
  }

  const initial = (
    (user.ime && user.ime[0]) ||
    (user.prezime && user.prezime[0]) ||
    "U"
  ).toUpperCase();

  return (
    <div className='relative' ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setOpen((s) => !s)}
        aria-haspopup='true'
        aria-expanded={open}
        className='group relative inline-flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
        title={`${user.ime} ${user.prezime}`}
      >
        {/* Background gradient on hover */}
        <div className='absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        
        {/* Avatar with gradient border */}
        <div className='relative'>
          {/* Animated border gradient */}
          <div className='absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300'></div>
          
          {/* Avatar circle */}
          <div className='relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 text-white font-bold text-sm shadow-lg'>
            {initial}
            
            {/* Online indicator */}
            <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse'></div>
          </div>
        </div>

        {/* User name (hidden on mobile) */}
        <span className='hidden sm:block relative text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors'>
          {user.ime}
        </span>

        {/* Dropdown arrow */}
        <svg 
          className={`relative w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill='none' 
          viewBox='0 0 24 24' 
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className='absolute right-0 mt-3 w-64 origin-top-right animate-fadeInUp'>
          {/* Menu container with glassmorphism */}
          <div className='bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden border border-gray-200/50 dark:border-gray-700/50'>
            {/* Gradient header */}
            <div className='h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500'></div>
            
            {/* User info section */}
            <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 text-white font-bold shadow-lg'>
                  {initial}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-bold text-gray-900 dark:text-white truncate'>
                    {user.ime} {user.prezime}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1'>
                    <SparklesIcon className='w-3 h-3' />
                    Student
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className='py-2'>
              <Link
                href='/profile'
                className='group flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-teal-500/10 hover:to-blue-500/10 transition-all duration-200'
                onClick={() => setOpen(false)}
              >
                <UserCircleIcon className='w-5 h-5 text-gray-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors' />
                <span className='flex-1'>Moj profil</span>
                <svg className='w-4 h-4 text-gray-400 transform group-hover:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </Link>

              <button
                onClick={handleLogout}
                className='group w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200'
              >
                <ArrowRightOnRectangleIcon className='w-5 h-5' />
                <span className='flex-1 text-left'>Odjavi se</span>
              </button>
            </div>

            {/* Bottom gradient */}
            <div className='h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500'></div>
          </div>
        </div>
      )}
    </div>
  );
}
