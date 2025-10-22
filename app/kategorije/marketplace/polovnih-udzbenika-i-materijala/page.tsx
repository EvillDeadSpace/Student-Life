import { fetchMarketplaceItems } from "@/lib/MarketplaceAPI/marketplaceApi";
import BooksComponents from "@/components/MarketPlaceComponents/BooksComponents";
import Link from "next/link";
import { ItemType } from "@prisma/client";

// Force this page to be rendered at request time so internal API routes are available
export const dynamic = "force-dynamic";

export default async function PolovneKnjige() {
  let data = [];
  try {
    data = await fetchMarketplaceItems(ItemType.BOOK);
  } catch (err) {
    // Log the error server-side but render a friendly UI to the user
    // so client navigation doesn't surface raw error objects or SQL.
    console.error("Error fetching books for marketplace category:", err);
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
          
            className="mt-8 inline-block bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-0 ml-2 animate-fadeInUp delay-400" >
              Dodaj svoju artiklu 
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
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 mb-6 shadow-lg'>
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
                  d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                />
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              Nema dostupnih knjiga
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              Trenutno nema knjiga u ponudi. Proveri ponovo kasnije!
            </p>
                   <Link 
            href={'/kategorije/marketplace/dodaj-artiklu'}
          
            className="mt-8 inline-block bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-0 ml-2 animate-fadeInUp delay-400" >
              Dodaj svoju artiklu 
            </Link>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 bg-grid-pattern'>
      {/* Hero Section */}
      <div className='relative overflow-hidden pt-16 pb-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white opacity-0 animate-fadeInUp'>
              <span className='bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent'>
                Pronađi, prodaj ili razmijeni udžbenike i materijale potrebne za
                studiranje.
              </span>
            </h1>
            <p className='mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200'>
              Pronađi udžbenike po povoljnim cenama i uštedi na školskim
              materijalima
            </p>
            <div className='mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg opacity-0 animate-fadeInUp delay-300 border border-gray-200 dark:border-gray-700'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Ukupno knjiga:
              </span>
              <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600'>
                {data.length}
              </span>
            </div>
            <Link 
            href={'/kategorije/marketplace/dodaj-artiklu'}
          
            className="mt-8 inline-block bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 opacity-0 ml-2 animate-fadeInUp delay-400" >
              Dodaj svoju artiklu 
            </Link>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <BooksComponents data={data} />
    </div>
  );
}
