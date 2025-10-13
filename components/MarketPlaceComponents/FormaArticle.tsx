"use client"
import React from "react";
import { AddBook } from "@/lib/MarketplaceAPI/bookApi";
import {
  PhotoIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function FormaArticle() {
  type ActionFormData = {
    sellerId: number
    title: string;
    author: string;
    faculty: string;
    subject: string;
    condition: string;
    price: number;
    description: string;
  };

interface BookPayload {
  sellerId?: number;
  title: string;
  author: string;
  faculty: string;
  subject: string;
  condition: string;
  price: number;
  description?: string;
}
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ActionFormData>();

  
  const onSubmit = async (data: ActionFormData) => {
    const idStorage = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const payload: BookPayload = {
      sellerId: idStorage?.id,
      title: data.title,
      author: data.author,
      faculty: data.faculty,
      subject: data.subject,
      condition: data.condition,
      price: Number(data.price),
      description: data.description || undefined,
    };

    try {
      await toast.promise(AddBook(payload), {
        loading: "Dodavanje...",
        success: "Knjiga je uspješno dodana!",
        error: "Neuspjelo dodavanje. Pokušajte ponovo.",
      });

      // reset form on success
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className='p-8 space-y-8'>
        {/* Row 1: Title and Author */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3'>
              <BookOpenIcon className='w-5 h-5 mr-2 text-teal-500' />
              Naslov knjige *
            </label>
            <input
              type='text'
              {...formRegister("title", { required: "Ovo polje je obavezno" })}
              className='w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              placeholder='Unesite naslov knjige...'
            />
            {errors.title && (
              <p className='text-sm text-red-500 mt-1'>{String(errors.title.message)}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3'>
              <UserIcon className='w-5 h-5 mr-2 text-teal-500' />
              Autor *
            </label>
            <input
              type='text'
              {...formRegister("author", { required: "Ovo polje je obavezno" })}
              required
              className='w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              placeholder='Ime autora...'
            />
            {errors.author && (
              <p className='text-sm text-red-500 mt-1'>{String(errors.author.message)}</p>
            )}
          </div>
        </div>

        {/* Row 2: Faculty and Subject */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3'>
              <BuildingLibraryIcon className='w-5 h-5 mr-2 text-teal-500' />
              Fakultet *
            </label>
            <input
              type='text'
              {...formRegister("faculty", {
                required: "Ovo polje je obavezno",
              })}
              required
              className='w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              placeholder='Naziv fakulteta...'
            />
            {errors.faculty && (
              <p className='text-sm text-red-500 mt-1'>{String(errors.faculty.message)}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3'>
              <AcademicCapIcon className='w-5 h-5 mr-2 text-teal-500' />
              Predmet *
            </label>
            <input
              type='text'
              {...formRegister("subject", {
                required: "Ovo polje je obavezno",
              })}
              required
              className='w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              placeholder='Naziv predmeta...'
            />
            {errors.subject && (
              <p className='text-sm text-red-500 mt-1'>{String(errors.subject.message)}</p>
            )}
          </div>
        </div>

        {/* Row 3: Condition and Price */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <label className='flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3'>
              <TagIcon className='w-5 h-5 mr-2 text-teal-500' />
              Stanje knjige *
            </label>
            <select
              {...formRegister("condition", {
                required: "Ovo polje je obavezno",
              })}
              className='w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white'
            >
              <option value='kao-nova'>Kao nova</option>
              <option value='dobro'>Dobro stanje</option>
              <option value='zadovoljavajuće'>Zadovoljavajuće</option>
              <option value='losije'>Lošije stanje</option>
            </select>
            {errors.condition && (
              <p className='text-sm text-red-500 mt-1'>{String(errors.condition.message)}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3'>
              <CurrencyDollarIcon className='w-5 h-5 mr-2 text-teal-500' />
              Cijena (KM) *
            </label>
            <input
              type='number'
              {...formRegister("price", { required: "Ovo polje je obavezno" })}
              required
              min='0'
              step='0.01'
              className='w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              placeholder='0.00'
            />
            {errors.price && (
              <p className='text-sm text-red-500 mt-1'>{String(errors.price.message)}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className='space-y-2'>
          <label className='flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3'>
            <ClipboardDocumentListIcon className='w-5 h-5 mr-2 text-teal-500' />
            Opis (opciono)
          </label>
          <textarea
            {...formRegister("description")}
            rows={4}
            className='w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none'
            placeholder='Dodatne informacije o knjizi, stanju, razlogu prodaje...'
          />
        </div>

        {/* Photo Upload Placeholder */}
        <div className='space-y-2'>
          <label className='flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3'>
            <PhotoIcon className='w-5 h-5 mr-2 text-teal-500' />
            Slika knjige (opciono)
          </label>
          <div className='border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 cursor-pointer group'>
            <PhotoIcon className='w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 group-hover:text-teal-500 transition-colors duration-300 mb-4' />
            <p className='text-gray-600 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300'>
              Kliknite da dodate sliku ili je povucite ovde
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
              PNG, JPG do 5MB
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-3 ${isSubmitting ? 'opacity-80' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                  ></path>
                </svg>
                <span>Dodavanje...</span>
              </>
            ) : (
              <span>Dodaj artiklu</span>
            )}
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
}
