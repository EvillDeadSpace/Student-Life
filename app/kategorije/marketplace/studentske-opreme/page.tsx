import { fetchMarketplaceItems } from "@/lib/MarketplaceAPI/marketplaceApi";
import BooksComponents from "@/components/MarketPlaceComponents/BooksComponents";
import Link from "next/link";
import { ItemType } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function StudentEquipment() {
  let data = [];
  try {
    data = await fetchMarketplaceItems(ItemType.EQUIPMENT);
  } catch (err) {
    console.error("Error fetching equipment for marketplace category:", err);
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 bg-grid-pattern py-16 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center py-20 opacity-0 animate-fadeInUp'>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              Greška pri učitavanju oglasa
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              Došlo je do greške pri povezivanju sa serverom. Pokušajte
              osvježiti stranicu ili pokušajte kasnije.
            </p>
            <div className='mt-6'>
              <Link
                href={'/kategorije/marketplace'}
                className='inline-block mt-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white py-2 px-4 rounded-lg'
              >
                Nazad na Marketplace
              </Link>
              <Link 
                href={'/kategorije/marketplace/dodaj-artiklu'}
                className="mt-8 inline-block bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-0 ml-2 animate-fadeInUp delay-400"
              >
                Dodaj opremu 
              </Link> 
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(data) || (data as unknown[]).length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 bg-grid-pattern py-16 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center py-20 opacity-0 animate-fadeInUp'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 mb-6 shadow-lg'>
              <svg
                className='w-10 h-10 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              Nema dostupne opreme
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              Trenutno nema studentske opreme u ponudi. Budi prvi koji će dodati!
            </p>
            <Link 
              href={'/kategorije/marketplace/dodaj-artiklu'}
              className="mt-8 inline-block bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fadeInUp delay-400"
            >
              Dodaj svoju opremu 
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 bg-grid-pattern'>
      <div className='relative overflow-hidden pt-16 pb-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white opacity-0 animate-fadeInUp'>
              <span className='bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent'>
                Studentska oprema i dodatci
              </span>
            </h1>
            <p className='mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200'>
              Pronađi laptop, tablet, kalkulatore i drugu opremu po povoljnim cenama
            </p>
            <div className='mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg opacity-0 animate-fadeInUp delay-300 border border-gray-200 dark:border-gray-700'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Ukupno artikala:
              </span>
              <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
                {data.length}
              </span>
            </div>
            <Link 
              href={'/kategorije/marketplace/dodaj-artiklu'}
              className="mt-8 inline-block bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-0 ml-2 animate-fadeInUp delay-400"
            >
              Dodaj svoju opremu 
            </Link>
          </div>
        </div>
      </div>

      <BooksComponents data={data} />
    </div>
  );
}
