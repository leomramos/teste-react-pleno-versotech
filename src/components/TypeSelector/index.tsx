import { Menu, Transition } from '@headlessui/react'
import { ArrowPathIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn, formatName } from '../../lib'
import type { IPokemonType } from '../../lib/types'
import { type AppDispatch } from '../../store'
import {
  getCurType,
  getTypes,
  getTypesStatus,
  setCurType,
} from '../../store/slices'

export const TypeSelector = () => {
  const dispatch: AppDispatch = useDispatch()

  const types = useSelector(getTypes)
  const curType = useSelector(getCurType)
  const typesStatus = useSelector(getTypesStatus)

  if (typesStatus === 'loading') {
    return (
      <ArrowPathIcon
        className='my-auto h-5 w-5 animate-spin'
        aria-hidden='true'
      />
    )
  }

  const handleTypeChange = (newType: IPokemonType | null) => {
    dispatch(setCurType(newType))
  }

  return (
    <div className='flex items-center justify-between gap-x-4'>
      {Boolean(curType) && (
        <button
          type='button'
          className='text-gray-500 hover:text-gray-400'
          onClick={() => handleTypeChange(null)}
        >
          Clear
        </button>
      )}

      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button
          className={cn([
            'group inline-flex justify-center items-center text-sm font-medium text-gray-700 hover:text-gray-900',
            { 'font-bold': Boolean(curType) },
          ])}
        >
          {formatName(curType?.name, 'Type')}
          <ChevronDownIcon
            className='-mr-1 ml-1 h-4 w-4 mt-1 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
            aria-hidden='true'
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none max-h-64 overflow-auto py-1'>
            {types?.map(type => (
              <TypeItem
                key={type.name}
                type={type}
                curType={curType}
                handleTypeChange={handleTypeChange}
              />
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

const TypeItem = ({
  type,
  curType,
  handleTypeChange,
}: {
  type: IPokemonType
  curType: IPokemonType | null
  handleTypeChange: (type: IPokemonType | null) => void
}) => {
  // Hide if the type is already selected
  if (type.name === curType?.name) return

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => handleTypeChange(type)}
          className={cn([
            'w-full text-left px-4 py-2 text-sm font-medium text-gray-900',
            {
              'bg-gray-100': active,
            },
          ])}
        >
          {formatName(type.name)}
        </button>
      )}
    </Menu.Item>
  )
}
