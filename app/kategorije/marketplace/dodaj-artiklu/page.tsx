import Link from "next/link";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import FormaArticle from "@/components/MarketPlaceComponents/FormaArticle";

function AddArticle() {
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
              <div className='w-2 h-2 bg-teal-500 rounded-full animate-pulse'></div>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Dodaj svoju artiklu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className='relative overflow-hidden pt-16 pb-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 mb-6 shadow-lg opacity-0 animate-fadeInUp transform hover:scale-110 transition-all duration-500'>
              <BookOpenIcon className='w-10 h-10 text-white' />
            </div>

            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white opacity-0 animate-fadeInUp delay-200'>
              <span className='bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent'>
                Dodaj svoju artiklu
              </span>
            </h1>

            <p className='mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-300'>
              Prodaj svoj udžbenik drugim studentima i pomozi im da uštede novac
            </p>

            {/* Stats Cards */}
            <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
              <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 animate-fadeInUp delay-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-4'>
                  <CurrencyDollarIcon className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  Brza prodaja
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Prodaj svoje knjige za 24h
                </p>
              </div>

              <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 animate-fadeInUp delay-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-4'>
                  <UserIcon className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  Sigurno
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Provjereni studenti
                </p>
              </div>

              <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 animate-fadeInUp delay-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4'>
                  <TagIcon className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  Najbolje cijene
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Bez komisije
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 animate-fadeInUp delay-700'>
          {/* Form Header */}
          <div className='bg-gradient-to-r from-teal-500 to-blue-600 p-8 text-center'>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Informacije o knjizi
            </h2>
            <p className='text-teal-100'>
              Popuni sve potrebne informacije o tvojoj knjizi
            </p>
          </div>

           {/* Forma Action */}
          <FormaArticle />
        </div>

        {/* Tips Section */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fadeInUp delay-1000'>
          <div className='bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-teal-200 dark:border-teal-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              💡 Savjeti za brže prodavanje
            </h3>
            <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
              <li>• Dodajte jasnu sliku korica</li>
              <li>• Opišite stanje knjige detaljno</li>
              <li>• Postavite konkurentnu cijenu</li>
              <li>• Odgovorite brzo na poruke</li>
            </ul>
          </div>

          <div className='bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-700'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
              🛡️ Sigurnost
            </h3>
            <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
              <li>• Susretajte se na javnim mjestima</li>
              <li>• Proverite identitet kupca</li>
              <li>• Koristite sigurne načine plaćanja</li>
              <li>• Prijavite sumnjive aktivnosti</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-1/4 left-1/4 w-4 h-4 bg-teal-400 rounded-full animate-pulse opacity-60 pointer-events-none'></div>
      <div className='absolute top-3/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700 opacity-50 pointer-events-none'></div>
      <div className='absolute bottom-1/4 left-1/6 w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-300 opacity-40 pointer-events-none'></div>
    </div>
  );
}

export default AddArticle;
