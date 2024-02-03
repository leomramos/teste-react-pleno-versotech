import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { getLimit, getPage, setPage } from '../../store/slices'

export const Pagination = ({ pokemonsCount }: { pokemonsCount: number }) => {
  const dispatch: AppDispatch = useDispatch()
  const page = useSelector(getPage)
  const limit = useSelector(getLimit)

  const pageCount = Math.ceil(pokemonsCount / limit)

  useEffect(() => {
    if (page > pageCount) {
      dispatch(setPage(Math.max(pageCount - 1, 0)))
    }
  }, [dispatch, page, pageCount])

  const firstIndex = Math.min(page * limit + 1, pokemonsCount)
  const lastIndex = Math.min(firstIndex + limit - 1, pokemonsCount)

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected))
  }

  return (
    <div className='flex flex-1 flex-wrap items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 gap-4'>
      <p className='text-sm text-gray-700'>
        Showing <span className='font-medium'>{firstIndex}</span> to{' '}
        <span className='font-medium'>{lastIndex}</span> of{' '}
        <span className='font-medium'>{pokemonsCount}</span> results
      </p>
      <ReactPaginate
        forcePage={page}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        breakLabel='...'
        previousLabel={
          <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
        }
        nextLabel={<ChevronRightIcon className='h-5 w-5' aria-hidden='true' />}
        containerClassName='isolate inline-flex -space-x-px rounded-md shadow-sm'
        pageLinkClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 select-none'
        activeLinkClassName='z-10 bg-gray-900 text-white focus-visible:outline focus-visible:outline-2 ring-0 focus-visible:outline-offset-2 hover:bg-gray-900 focus-visible:outline-gray-900'
        breakLinkClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 select-none'
        previousLinkClassName='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 select-none'
        nextLinkClassName='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 select-none'
        disabledLinkClassName='pointer-events-none opacity-50'
      />
    </div>
  )
}
