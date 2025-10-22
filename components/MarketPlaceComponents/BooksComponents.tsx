import React from "react";
import Link from "next/link";
import { MarketplaceItemResponse } from "@/lib/MarketplaceAPI/marketplaceApi";

interface BooksComponentsProps {
  data: MarketplaceItemResponse[];
}

function BooksComponents({ data }: BooksComponentsProps) {
  const itemsArray = Array.isArray(data) ? data : [];
  
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {itemsArray.map((item: MarketplaceItemResponse, index: number) => (
          <div
            key={item.id}
            className='group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-fadeInUp overflow-hidden border border-gray-200 dark:border-gray-700'
            style={{ animationDelay: `${(index % 12) * 0.1}s` }}
          >
            {/* Gradient Background Overlay */}
            <div className='absolute inset-0 bg-gradient-to-br  from-teal-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100  transition-opacity duration-300 rounded-2xl'></div>

            {/* Card Header */}
            <div className={`relative p-4 ${
              item.type === 'BOOK' ? 'bg-gradient-to-r from-teal-500 to-blue-600' :
              item.type === 'EQUIPMENT' ? 'bg-gradient-to-r from-purple-500 to-pink-600' :
              'bg-gradient-to-r from-emerald-500 to-cyan-600'
            }`}>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h3 className='text-white font-bold text-lg line-clamp-2 mb-1'>
                    {item.title}
                  </h3>
                  {item.type === 'BOOK' && item.author && (
                    <p className='text-white/90 text-sm'>{item.author}</p>
                  )}
                  {item.type === 'EQUIPMENT' && item.brand && (
                    <p className='text-white/90 text-sm'>{item.brand} {item.model && `- ${item.model}`}</p>
                  )}
                  {item.type === 'COURSE' && item.subject && (
                    <p className='text-white/90 text-sm'>{item.subject}</p>
                  )}
                </div>
                {item.isSold ? (
                  <span className='ml-2 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-md'>
                    Prodato
                  </span>
                ) : (
                  <span className='ml-2 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-md'>
                    Dostupno
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className='relative p-6 space-y-4'>
              {/* Price - Most Important */}
              <div className='flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700/50'>
                <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Cijena:
                </span>
                <span className='text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                  {item.price} KM
                </span>
              </div>

              {/* Type-specific details */}
              <div className='space-y-3'>
                {item.faculty && (
                  <div className='flex items-center gap-2'>
                    <svg
                      className='w-5 h-5 text-teal-500 dark:text-teal-400 flex-shrink-0'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                      />
                    </svg>
                    <span className='text-sm text-gray-700 dark:text-gray-300 line-clamp-1'>
                      {item.faculty}
                    </span>
                  </div>
                )}
                
                {item.type === 'BOOK' && item.subject && (
                  <div className='flex items-center gap-2'>
                    <svg
                      className='w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                      />
                    </svg>
                    <span className='text-sm text-gray-700 dark:text-gray-300 line-clamp-1'>
                      {item.subject}
                    </span>
                  </div>
                )}

                {item.type === 'EQUIPMENT' && item.category && (
                  <div className='flex items-center gap-2'>
                    <svg
                      className='w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                      />
                    </svg>
                    <span className='text-sm text-gray-700 dark:text-gray-300 line-clamp-1 capitalize'>
                      {item.category.toLowerCase().replace(/_/g, ' ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Condition */}
              {item.condition && (
                <div className='flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700'>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    Stanje:
                  </span>
                  <span className='text-sm font-semibold text-gray-900 dark:text-white capitalize'>
                    {item.condition}
                  </span>
                </div>
              )}

              {/* Date */}
              <div className='flex items-center gap-2'>
                <svg
                  className='w-4 h-4 text-gray-400 dark:text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {new Date(item.createdAt).toLocaleDateString("sr-RS")}
                </span>
              </div>

              {/* Action Button */}
              {item.isSold ? (
                <span
                  className='w-full mt-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg opacity-50 cursor-not-allowed block text-center'
                >
                  Prodato
                </span>
              ) : (
                <Link
                  href={`/kategorije/marketplace/${item.id}`}
                  className='w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer block text-center'
                >
                  Pogledaj detalje
                </Link>
              )}
            </div>

            {/* Decorative Elements */}
            <div className='absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl pointer-events-none'></div>
            <div className='absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-lg pointer-events-none'></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksComponents;
