"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface LinkComponentsProps {
  href: string;
  text: string;
  isMobile?: boolean;
  isActive?: boolean;
  className?: string;
}

export default function LinkComponents({
  href,
  text,
  isMobile = false,
  className,
}: LinkComponentsProps) {
  const pathname = usePathname();
  const isCurrentPage = pathname === href;
  
  if (className) {
    return (
      <Link href={href} className={className}>
        {text}
      </Link>
    );
  }

  if (isMobile) {
    return (
      <Link 
        href={href}
        className={`
          group relative block px-4 py-3 text-base font-semibold
          transition-all duration-300 rounded-xl overflow-hidden
          ${isCurrentPage 
            ? 'text-white' 
            : 'text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400'
          }
        `}
      >
        {/* Active background gradient */}
        {isCurrentPage && (
          <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 animate-gradient-x'></div>
        )}
        
        {/* Hover background */}
        {!isCurrentPage && (
          <div className='absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        )}
        
        {/* Text */}
        <span className='relative flex items-center justify-between'>
          {text}
          
          {/* Arrow icon on hover */}
          <svg 
            className={`w-5 h-5 transform transition-all duration-300 ${
              isCurrentPage 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
            }`}
            fill='none' 
            viewBox='0 0 24 24' 
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </span>
        
        {/* Bottom accent line */}
        {isCurrentPage && (
          <div className='absolute bottom-0 left-4 right-4 h-0.5 bg-white/50'></div>
        )}
      </Link>
    );
  }

  // Desktop link
  return (
    <Link 
      href={href}
      className='group relative px-4 py-2 text-sm font-semibold overflow-hidden rounded-lg transition-all duration-300'
    >
      {/* Active state gradient background */}
      {isCurrentPage && (
        <>
          <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500'></div>
          <div className='absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </>
      )}
      
      {/* Hover gradient for non-active links */}
      {!isCurrentPage && (
        <div className='absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      )}
      
      {/* Text */}
      <span className={`
        relative transition-colors duration-300
        ${isCurrentPage 
          ? 'text-white' 
          : 'text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400'
        }
      `}>
        {text}
      </span>
      
      {/* Bottom highlight line */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500
        transform origin-left transition-transform duration-300
        ${isCurrentPage ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
      `}></div>
      
      {/* Glow effect on active */}
      {isCurrentPage && (
        <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 blur-lg opacity-50 -z-10'></div>
      )}
    </Link>
  );
}

export function useMenuOpen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return { isMenuOpen, toggleMenu };
}

// Mobile Menu Button komponenta
interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({
  isMenuOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <div className='md:hidden'>
      <button
        onClick={onClick}
        className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:text-gray-900 dark:focus:text-white'
      >
        <svg
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          {isMenuOpen ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          )}
        </svg>
      </button>
    </div>
  );
}
