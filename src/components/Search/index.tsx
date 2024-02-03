import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { getQuery, setQuery } from '../../store/slices'

export const Search = () => {
  const dispatch: AppDispatch = useDispatch()
  const query = useSelector(getQuery)

  const handleSearch = (value: string) => {
    dispatch(setQuery(value))
  }

  return (
    <div className='flex-1 max-w-lg'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <MagnifyingGlassIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </div>
        <input
          id='search'
          name='search'
          value={query}
          onChange={({ target: { value } }) => handleSearch(value)}
          className='block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
          placeholder='Search'
          type='search'
        />
      </div>
    </div>
  )
}
