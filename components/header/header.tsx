import Image from "next/image";
import LinkComponents from "./Link";
import MobileMenuToggle from "./MobileMenu";
import UserAuth from "./UserAuth";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <>
      {/* Navigation */}
      <nav className='sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50'>
        {/* Subtle gradient line at top */}
        <div className='absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 opacity-60'></div>
        
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo with animation */}
            <div className='flex-shrink-0 flex items-center group'>
              <div className='relative'>
                {/* Glow effect on hover */}
                <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500'></div>
                
                <Image
                  src='/studentLogo.png'
                  width={40}
                  height={40}
                  alt='Student Life Logo'
                  className='mr-3 relative transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300'
                />
              </div>
              
              <div className='flex items-center gap-2'>
                <h1 className='text-xl font-black bg-gradient-to-r from-gray-900 via-teal-600 to-blue-600 dark:from-white dark:via-teal-400 dark:to-blue-400 bg-clip-text text-transparent'>
                  Student Life
                </h1>
                
                {/* Floating "New" badge */}
                <span className='hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg animate-pulse'>
                  <SparklesIcon className='w-3 h-3' />
                  Hot
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:block'>
              <div className='ml-10 flex items-center space-x-2'>
                <LinkComponents href='/' text='Pocetna' isActive={true} />
                <LinkComponents href='/kategorije' text='Kategorije' />
                <LinkComponents href='/dodaj-iskustvo' text='Dodaj iskustvo' />
                
                {/* Divider */}
                <div className='h-8 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-2'></div>
                
                <UserAuth />
              </div>
            </div>

            {/* Mobile menu component */}
            <MobileMenuToggle />
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-50'></div>
      </nav>
    </>
  );
}
