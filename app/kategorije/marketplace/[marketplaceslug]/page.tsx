import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  UserIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  TagIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Const import
import { conditionMap } from "@/components/constants/SlugConstants";

type Props = { params: { marketplaceslug: string } };

export default async function MarketplaceSlug({ params }: Props) {
  const id = Number(params.marketplaceslug);
  if (Number.isNaN(id)) {
    notFound();
  }

  const book = await prisma.bookList.findUnique({
    where: { id },
  });

  if (!book) {
    notFound();
  }

  const conditionInfo =
    conditionMap[book.condition] || conditionMap["zadovoljavajuće"];

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 bg-grid-pattern'>
      {/* Header Navigation */}
      <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <Link
              href='/kategorije/marketplace/polovnih-udzbenika-i-materijala'
              className='flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 group opacity-0 animate-fadeInUp'
            >
              <ArrowLeftIcon className='w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300' />
              Nazad na knjige
            </Link>
            <div className='flex items-center space-x-2 opacity-0 animate-fadeInUp delay-100'>
              {book.isSold ? (
                <div className='flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg font-medium'>
                  <CheckCircleIcon className='w-5 h-5' />
                  <span>Prodato</span>
                </div>
              ) : (
                <div className='flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg font-medium'>
                  <ClockIcon className='w-5 h-5' />
                  <span>Dostupno</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className='relative overflow-hidden pt-12 pb-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 mb-6 shadow-lg opacity-0 animate-fadeInUp transform hover:scale-110 transition-all duration-500'>
              <BookOpenIcon className='w-10 h-10 text-white' />
            </div>

            <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white opacity-0 animate-fadeInUp delay-200'>
              <span className='bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent'>
                {book.title}
              </span>
            </h1>
            <p className='mt-4 text-xl text-gray-600 dark:text-gray-300 opacity-0 animate-fadeInUp delay-300'>
              {book.author}
            </p>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className='absolute top-1/4 left-1/4 w-4 h-4 bg-teal-400 rounded-full animate-pulse opacity-60 pointer-events-none'></div>
        <div className='absolute top-3/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700 opacity-50 pointer-events-none'></div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Main Info */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Book Details Card */}
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 animate-fadeInUp delay-400'>
              <div className='bg-gradient-to-r from-teal-500 to-blue-600 p-6'>
                <h2 className='text-2xl font-bold text-white flex items-center'>
                  <ClipboardDocumentListIcon className='w-6 h-6 mr-3' />
                  Detalji o knjizi
                </h2>
              </div>

              <div className='p-6 space-y-6'>
                {/* Faculty */}
                <div className='flex items-start space-x-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 transform hover:scale-[1.02] transition-all duration-300'>
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center'>
                      <BuildingLibraryIcon className='w-6 h-6 text-white' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      Fakultet
                    </p>
                    <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
                      {book.faculty}
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div className='flex items-start space-x-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700 transform hover:scale-[1.02] transition-all duration-300'>
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center'>
                      <AcademicCapIcon className='w-6 h-6 text-white' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      Predmet
                    </p>
                    <p className='text-lg font-semibold text-gray-900 dark:text-white mt-1'>
                      {book.subject}
                    </p>
                  </div>
                </div>

                {/* Condition */}
                <div className='flex items-start space-x-4 p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700 transform hover:scale-[1.02] transition-all duration-300'>
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center'>
                      <TagIcon className='w-6 h-6 text-white' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                      Stanje
                    </p>
                    <div className='mt-1'>
                      <span
                        className={`inline-block px-4 py-2 rounded-lg font-semibold ${conditionInfo.bgColor} ${conditionInfo.color}`}
                      >
                        {conditionInfo.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {book.description && (
                  <div className='p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600'>
                    <p className='text-sm font-medium text-gray-600 dark:text-gray-400 mb-2'>
                      Opis
                    </p>
                    <p className='text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap'>
                      {book.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Card */}
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 animate-fadeInUp delay-500'>
              <div className='bg-gradient-to-r from-indigo-500 to-purple-600 p-6'>
                <h2 className='text-2xl font-bold text-white flex items-center'>
                  <CalendarIcon className='w-6 h-6 mr-3' />
                  Historija
                </h2>
              </div>

              <div className='p-6 space-y-4'>
                <div className='flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center'>
                      <ClockIcon className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        Objavljeno
                      </p>
                      <p className='font-semibold text-gray-900 dark:text-white'>
                        {book.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center'>
                      <CalendarIcon className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        Ažurirano
                      </p>
                      <p className='font-semibold text-gray-900 dark:text-white'>
                        {book.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className='space-y-6'>
            {/* Price Card */}
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 animate-fadeInUp delay-600 sticky top-24'>
              <div className='bg-gradient-to-r from-green-500 to-emerald-600 p-6'>
                <div className='flex items-center justify-center'>
                  <CurrencyDollarIcon className='w-8 h-8 text-white mr-2' />
                  <h2 className='text-3xl font-bold text-white'>
                    {book.price.toFixed(2)} KM
                  </h2>
                </div>
              </div>

              <div className='p-6 space-y-4'>
                {!book.isSold ? (
                  <>
                    <button className='w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2'>
                      <UserIcon className='w-5 h-5' />
                      <span>Kontaktiraj prodavca</span>
                    </button>
                    <button className='w-full bg-white dark:bg-gray-700 border-2 border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105'>
                      Dodaj u omiljene
                    </button>
                  </>
                ) : (
                  <div className='text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border-2 border-red-200 dark:border-red-700'>
                    <CheckCircleIcon className='w-12 h-12 mx-auto text-red-500 mb-3' />
                    <p className='text-lg font-bold text-red-700 dark:text-red-400'>
                      Ova knjiga je već prodana
                    </p>
                  </div>
                )}

                {/* Info boxes */}
                <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3'>
                  <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                    <CheckCircleIcon className='w-5 h-5 mr-2 text-green-500' />
                    <span>Provjerena ponuda</span>
                  </div>
                  <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                    <CheckCircleIcon className='w-5 h-5 mr-2 text-green-500' />
                    <span>Brza kupovina</span>
                  </div>
                  <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                    <CheckCircleIcon className='w-5 h-5 mr-2 text-green-500' />
                    <span>Siguran način plaćanja</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to listing button */}
        <div className='text-center mt-12 opacity-0 animate-fadeInUp delay-800'>
          <Link
            href='/kategorije/marketplace/polovnih-udzbenika-i-materijala'
            className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
          >
            Pogledaj još knjiga
            <svg
              className='w-5 h-5 ml-2'
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
          </Link>
        </div>
      </div>
    </div>
  );
}
