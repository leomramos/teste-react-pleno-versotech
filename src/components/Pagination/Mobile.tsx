import { validatePage } from '../../lib'

export const MobileSelector = ({
  pageCount,
  manualPage,
  setManualPage,
  handlePageChange,
}: {
  pageCount: number
  manualPage: number
  setManualPage: React.Dispatch<React.SetStateAction<number>>
  handlePageChange: (event: { selected: number }) => void
}) => (
  <div className='flex gap-2 items-center sm:hidden '>
    <input
      type='number'
      value={(manualPage + 1).toString()}
      min={1}
      max={pageCount}
      onChange={({ target: { value } }) =>
        setManualPage(Math.min(Number(value) - 1, pageCount - 1))
      }
      onBlur={({ target: { value } }) =>
        handlePageChange({
          selected: validatePage(Number(value) - 1, pageCount),
        })
      }
      className='text-xl font-medium text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900 py-1 px-1.5 rounded-md'
    />
    <span className='text-xl font-medium text-gray-900'>/ {pageCount}</span>
  </div>
)
