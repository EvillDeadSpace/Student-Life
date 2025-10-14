import Image from "next/image";
import Link from "next/link";
import HeroCounterNumber from "./HeroCounterNumber";
import { Suspense } from "react";
import HeroCounterFallback from "./HeroCounterFallback";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default async function HeroSection() {
  return (
    <section className='min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 flex items-center py-20'>
      {/* Animated mesh gradient background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-teal-400/30 via-emerald-400/20 to-transparent rounded-full blur-3xl animate-blob'></div>
        <div className='absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-tl from-blue-400/30 via-indigo-400/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/20 via-pink-400/15 to-transparent rounded-full blur-3xl animate-pulse'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10'>
        {/* Top badge */}
        <div className='flex justify-center mb-8 opacity-0 animate-fadeInUp'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-teal-200 dark:border-teal-700 shadow-lg'>
            <SparklesIcon className='w-4 h-4 text-teal-600 dark:text-teal-400' />
            <span className='text-sm font-medium bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent'>
              Tvoja studentska zajednica
            </span>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left side - Text content */}
          <div className='text-center lg:text-left relative z-40 space-y-8'>
            {/* Main heading with enhanced typography */}
            <div className='space-y-4 opacity-0 animate-fadeInUp delay-100'>
              <h1 className='text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-tight'>
                Student{" "}
                <span className='relative inline-block'>
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-emerald-500 to-blue-500 animate-gradient-x'>
                    Life
                  </span>
                  <svg
                    className='absolute -bottom-2 left-0 w-full'
                    height='12'
                    viewBox='0 0 200 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M2 10C50 2 100 2 198 10'
                      stroke='url(#gradient)'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                    <defs>
                      <linearGradient
                        id='gradient'
                        x1='0'
                        y1='0'
                        x2='200'
                        y2='0'
                      >
                        <stop offset='0%' stopColor='#14b8a6' />
                        <stop offset='50%' stopColor='#10b981' />
                        <stop offset='100%' stopColor='#3b82f6' />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className='text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200'>
                Tvoj vodič kroz studentske dane
              </p>
            </div>

            {/* Enhanced description */}
            <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fadeInUp delay-200'>
              Otkrijte autentična iskustva studenata o fakultetima, domovima i
              životu u gradu. Podijelite svoje priče i pomozite budućim
              studentima da donesu prave odluke.
            </p>

            {/* Feature pills */}
            <div className='flex flex-wrap gap-3 justify-center lg:justify-start opacity-0 animate-fadeInUp delay-300'>
              <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700'>
                <BookOpenIcon className='w-4 h-4' />
                <span className='text-sm font-medium'>Autentična iskustva</span>
              </div>
              <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'>
                <ChatBubbleLeftRightIcon className='w-4 h-4' />
                <span className='text-sm font-medium'>Aktivna zajednica</span>
              </div>
              <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700'>
                <ShoppingBagIcon className='w-4 h-4' />
                <span className='text-sm font-medium'>Marketplace</span>
              </div>
            </div>

            {/* Enhanced CTAs */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fadeInUp delay-400'>
              <Link
                href='/kategorije'
                className='group relative overflow-hidden bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center justify-center gap-3 text-center cursor-pointer no-underline z-50 transform hover:scale-105'
              >
                <span className='relative z-10'>Podijeli iskustvo</span>
                <svg
                  className='w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 7l5 5m0 0l-5 5m5-5H6'
                  />
                </svg>
                <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
              </Link>

              <Link
                href='/kategorije'
                className='group relative overflow-hidden bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 font-bold py-5 px-10 rounded-2xl border-2 border-teal-600 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-3 text-center cursor-pointer no-underline z-50 transform hover:scale-105'
              >
                <AcademicCapIcon className='w-5 h-5' />
                <span>Pregledaj kategorije</span>
              </Link>
            </div>

            {/* Stats with enhanced design */}
            <Suspense fallback={<HeroCounterFallback />}>
              <HeroCounterNumber />
            </Suspense>

            {/* Trust indicators */}
            <div className='flex flex-wrap items-center gap-6 justify-center lg:justify-start opacity-0 animate-fadeInUp delay-500 pt-4'>
              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <svg
                  className='w-5 h-5 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='font-medium'>100% Besplatno</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <svg
                  className='w-5 h-5 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='font-medium'>Bez registracije</span>
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                <svg
                  className='w-5 h-5 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='font-medium'>Sigurno i privatno</span>
              </div>
            </div>
          </div>

          {/* Right side - Enhanced visual */}
          <div className='relative opacity-0 animate-fadeInUp delay-600'>
            {/* Floating feature cards */}
            <div className='absolute -top-8 -left-8 z-20 opacity-0 animate-fadeInUp delay-700'>
              <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-110 transition-transform duration-300'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center'>
                    <UserGroupIcon className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                      5k+
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Studenata
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='absolute -bottom-8 -right-8 z-20 opacity-0 animate-fadeInUp delay-800'>
              <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-110 transition-transform duration-300'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center'>
                    <BookOpenIcon className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                      1k+
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Priča
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main image with enhanced effects */}
            <div className='relative z-10 mx-auto max-w-md lg:max-w-lg'>
              <div className='relative group'>
                {/* Glow effect */}
                <div className='absolute -inset-4 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500'></div>

                <Image
                  src='/student-hero.svg'
                  alt='Studenti'
                  width={600}
                  height={500}
                  className='relative w-full h-auto rounded-3xl shadow-2xl object-cover transform group-hover:scale-[1.02] transition-all duration-500'
                  priority
                />

                {/* Animated rings */}
                <div className='absolute inset-0 rounded-3xl border-4 border-teal-400/20 group-hover:border-teal-400/40 transition-all duration-500'></div>
                <div className='absolute -inset-2 rounded-3xl border-2 border-blue-400/10 group-hover:border-blue-400/30 transition-all duration-700'></div>
              </div>
            </div>

            {/* Background decorative blobs */}
            <div className='absolute -top-16 -right-16 w-96 h-96 bg-gradient-to-r from-teal-300/30 to-emerald-300/20 dark:from-teal-600/20 dark:to-emerald-600/10 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute -bottom-16 -left-16 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-pink-300/20 dark:from-purple-600/20 dark:to-pink-600/10 rounded-full blur-3xl pointer-events-none'></div>
          </div>
        </div>
      </div>

      {/* Enhanced floating particles with varied animations */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Large particles */}
        <div className='absolute top-[15%] left-[10%] w-3 h-3 bg-teal-400 rounded-full animate-pulse opacity-60'></div>
        <div className='absolute top-[60%] left-[15%] w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-700 opacity-50'></div>
        <div className='absolute top-[40%] right-[20%] w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-1000 opacity-40'></div>
        <div className='absolute top-[25%] right-[15%] w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300 opacity-60'></div>
        <div className='absolute bottom-[30%] left-[8%] w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-500 opacity-30'></div>
        <div className='absolute top-[80%] right-[25%] w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200 opacity-50'></div>
        <div className='absolute top-[50%] left-[45%] w-2 h-2 bg-teal-300 rounded-full animate-pulse delay-600 opacity-40'></div>
        <div className='absolute bottom-[15%] right-[10%] w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-400 opacity-45'></div>
      </div>

      {/* Grid pattern overlay */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05] pointer-events-none'></div>
    </section>
  );
}
