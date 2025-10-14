import { fetchAllStudent, heroPost } from "@/lib/api";

export default async function HeroCounterNumber() {
  const post = await heroPost();
  const user = await fetchAllStudent();

  const finalPost = Math.floor(post.length / 10) * 10;
  const finalUser = Math.floor(user.length / 10) * 10;

  return (
    <div className='mt-12 opacity-0 animate-fadeInUp delay-600'>
      {/* Glassmorphism container */}
      <div className='bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 shadow-2xl'>
        <div className='grid grid-cols-3 gap-6'>
          {/* Iskustava */}
          <div className='group cursor-pointer text-center transform hover:scale-110 transition-all duration-300'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
              <div className='relative bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl p-4 border border-teal-200 dark:border-teal-700'>
                <div className='text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2'>
                  {finalPost}+
                </div>
                <div className='text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide'>
                  Iskustava
                </div>
              </div>
            </div>
          </div>

          {/* Studenata */}
          <div className='group cursor-pointer text-center transform hover:scale-110 transition-all duration-300'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
              <div className='relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-4 border border-blue-200 dark:border-blue-700'>
                <div className='text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2'>
                  {finalUser}+
                </div>
                <div className='text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide'>
                  Studenata
                </div>
              </div>
            </div>
          </div>

          {/* Fakulteta */}
          <div className='group cursor-pointer text-center transform hover:scale-110 transition-all duration-300'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
              <div className='relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-4 border border-purple-200 dark:border-purple-700'>
                <div className='text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2'>
                  50+
                </div>
                <div className='text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide'>
                  Fakulteta
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className='mt-4 flex items-center justify-center gap-2'>
          <div className='h-1 w-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500'></div>
          <div className='h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500'></div>
          <div className='h-1 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500'></div>
        </div>
      </div>
    </div>
  );
}
