import { useMemo } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { getLimit, setPage } from '../../store/slices'

export const Pagination = ({ pokemonsCount }: { pokemonsCount: number }) => {
  const dispatch: AppDispatch = useDispatch()
  const limit = useSelector(getLimit)

  const pageCount = useMemo(
    () => Math.ceil(pokemonsCount / limit),
    [pokemonsCount, limit]
  )

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected))
  }

  return (
    <div className='flex'>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel='<'
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
