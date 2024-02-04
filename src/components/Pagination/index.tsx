import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { getLimit, getPage, setLimit, setPage } from '../../store/slices'
import { MobileSelector } from './Mobile'

export const Pagination = ({ pokemonsCount }: { pokemonsCount: number }) => {
  const dispatch: AppDispatch = useDispatch()
  const page = useSelector(getPage)
  const limit = useSelector(getLimit)

  const limits = useRef(Array.from({ length: 8 }, (_, i) => (i + 1) * 4))
  const pageCount = Math.ceil(pokemonsCount / limit)
  const firstIndex = Math.min(page * limit + 1, pokemonsCount)
  const lastIndex = Math.min(firstIndex + limit - 1, pokemonsCount)

  const [manualPage, setManualPage] = useState(page)

  // Sets the new limits whenever the page count changes
  useEffect(() => {
    if (page < 0) {
      setManualPage(0)
      dispatch(setPage(0))
    }
    if (page > pageCount) {
      const newLimit = Math.max(pageCount - 1, 0)
      setManualPage(newLimit)
      dispatch(setPage(newLimit))
    }
  }, [dispatch, page, pageCount])

  // Invoke when user click or change input to request another page.
  const handlePageChange = (event: { selected: number }) => {
    setManualPage(event.selected)
    dispatch(setPage(event.selected))
  }

  const handleLimit = (limit: number) => dispatch(setLimit(limit))

  return (
    <div className='flex flex-1 flex-wrap-reverse items-center justify-between border-t border-gray-200 px-4 py-8 sm:px-6 gap-6'>
      <div className='flex max-lg:mx-auto gap-4 items-center flex-wrap justify-center'>
        <p className='text-sm text-gray-700'>
          Showing <span className='font-medium'>{firstIndex}</span> to{' '}
          <span className='font-medium'>{lastIndex}</span> of{' '}
          <span className='font-medium'>{pokemonsCount}</span> results
        </p>
        <div className='flex items-center gap-2'>
          <select
            data-testid='limit-selector'
            id='location'
            name='location'
            className='block rounded-md border-0 py-1.5 pl-3 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 text-sm sm:leading-6'
            value={limit}
            onChange={({ target: { value } }) => handleLimit(Number(value))}
          >
            {limits.current.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <label htmlFor='location' className='block text-xs text-gray-600'>
            Pokémons per page
          </label>
        </div>
      </div>
      <div className='max-lg:mx-auto flex items-center gap-4'>
        <ReactPaginate
          forcePage={page}
          onPageChange={handlePageChange}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          breakLabel='...'
          previousLabel={
            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
          }
          nextLabel={
            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
          }
          containerClassName='isolate inline-flex -space-x-px rounded-md shadow-sm'
          pageLinkClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 select-none hidden sm:block'
          activeLinkClassName='z-10 bg-gray-900 text-white focus-visible:outline focus-visible:outline-2 ring-0 focus-visible:outline-offset-2 hover:bg-gray-900 focus-visible:outline-gray-900 !block'
          breakLinkClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 select-none hidden sm:block'
          previousLinkClassName='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 select-none'
          nextLinkClassName='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 select-none'
          disabledLinkClassName='pointer-events-none opacity-50'
        />
        <MobileSelector
          pageCount={pageCount}
          manualPage={manualPage}
          setManualPage={setManualPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
