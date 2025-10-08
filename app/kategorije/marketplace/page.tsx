import React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

import { categories } from "@/components/constants/ConstMarketPlace";

export default function MarketPlace() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Link
                href='/kategorije'
                className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
              >
                <ArrowLeftIcon className='w-5 h-5 mr-2' />
                Nazad na kategorije
              </Link>
            </div>
            <div className='flex space-x-3'>
              <Link
                href={"/dodaj-iskustvo?cat=Fakultet"}
                className='bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center'
              >
                <PlusIcon className='w-5 h-5 mr-2' />
                Podjeli iskustvo
              </Link>
            </div>
          </div>

          <div className='mt-6 flex items-center'>
            <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 mr-4'>
              <ShoppingBagIcon className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Marketplace
              </h1>
              <p className='text-gray-600 dark:text-gray-300 mt-1'>
                Mjesto gdje mozes naci razne stvari poput polovnih
                knjiga/materijala, studneska oprmea, smjestaj i prevoz,
                kursevi/privatni casovi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`marketplace/${category.slug}`}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-fadeInUp cursor-pointer ${
                index === 2 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} ${category.hoverColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
              ></div>

              {/* Card Content */}
              <div className='relative p-8'>
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className='w-8 h-8 text-white' />
                </div>

                {/* Title */}
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300'>
                  {category.title}
                </h3>

                {/* Description */}
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed mb-6'>
                  {category.description}
                </p>

                {/* CTA Button */}
                <div className='flex items-center text-teal-600 dark:text-teal-400 font-medium group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300'>
                  <span>Saznaj više</span>
                  <svg
                    className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className='absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl'></div>
              <div className='absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-lg'></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
