export const SkeletonLoader = () => (
  <div className='flex flex-col p-8 items-center'>
    {/* Pokemon Image */}
    <span className='bg-gray-300 animate-pulse mx-auto h-32 w-32 flex-shrink-0 rounded-full' />

    {/* Pokemon Name */}
    <span className='bg-gray-300 animate-pulse h-7 w-24 mt-2' />

    {/* Pokemon Types */}
    <span className='bg-gray-300 animate-pulse h-5 w-48 mt-2' />

    {/* Tabs */}
    <div className='mt-4 flex flex-wrap justify-center gap-x-8 gap-y-5 mx-auto'>
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i} className='bg-gray-300 animate-pulse h-4 w-16' />
      ))}
    </div>

    {/* Tab Information */}
    <div className='mt-8 grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 min-h-48 max-h-64 overflow-auto'>
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className='bg-gray-300 animate-pulse h-4 w-20 border-gray-300 border-b'
        />
      ))}
    </div>
  </div>
)
