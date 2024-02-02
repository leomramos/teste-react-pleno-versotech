import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { cn, formatName } from '../../lib'
import { IPokemonType } from '../../types'

const types: IPokemonType[] = [
  {
    name: 'normal',
    url: 'https://pokeapi.co/api/v2/type/1/',
  },
  {
    name: 'fighting',
    url: 'https://pokeapi.co/api/v2/type/2/',
  },
  {
    name: 'flying',
    url: 'https://pokeapi.co/api/v2/type/3/',
  },
  {
    name: 'poison',
    url: 'https://pokeapi.co/api/v2/type/4/',
  },
  {
    name: 'ground',
    url: 'https://pokeapi.co/api/v2/type/5/',
  },
  {
    name: 'rock',
    url: 'https://pokeapi.co/api/v2/type/6/',
  },
  {
    name: 'bug',
    url: 'https://pokeapi.co/api/v2/type/7/',
  },
  {
    name: 'ghost',
    url: 'https://pokeapi.co/api/v2/type/8/',
  },
  {
    name: 'steel',
    url: 'https://pokeapi.co/api/v2/type/9/',
  },
  {
    name: 'fire',
    url: 'https://pokeapi.co/api/v2/type/10/',
  },
  {
    name: 'water',
    url: 'https://pokeapi.co/api/v2/type/11/',
  },
  {
    name: 'grass',
    url: 'https://pokeapi.co/api/v2/type/12/',
  },
  {
    name: 'electric',
    url: 'https://pokeapi.co/api/v2/type/13/',
  },
  {
    name: 'psychic',
    url: 'https://pokeapi.co/api/v2/type/14/',
  },
  {
    name: 'ice',
    url: 'https://pokeapi.co/api/v2/type/15/',
  },
  {
    name: 'dragon',
    url: 'https://pokeapi.co/api/v2/type/16/',
  },
  {
    name: 'dark',
    url: 'https://pokeapi.co/api/v2/type/17/',
  },
  {
    name: 'fairy',
    url: 'https://pokeapi.co/api/v2/type/18/',
  },
  {
    name: 'unknown',
    url: 'https://pokeapi.co/api/v2/type/10001/',
  },
  {
    name: 'shadow',
    url: 'https://pokeapi.co/api/v2/type/10002/',
  },
]

export const TypeSelector = ({
  curType,
  setCurType,
}: {
  curType: IPokemonType | null
  setCurType: React.Dispatch<React.SetStateAction<IPokemonType | null>>
}) => {
  return (
    <div className='flex items-center justify-between'>
      {Boolean(curType) && (
        <div className='pr-6'>
          <button
            type='button'
            className='text-gray-500'
            onClick={() => setCurType(null)}
          >
            Clear
          </button>
        </div>
      )}

      <Menu as='div' className='relative inline-block text-left'>
        <div>
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
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none max-h-64 overflow-auto'>
            <div className='py-1'>
              {types.map(
                type =>
                  type.name !== curType?.name && (
                    <Menu.Item key={type.name}>
                      {({ active }) => (
                        <button
                          onClick={() => setCurType(type)}
                          className={cn([
                            'w-full text-left px-4 py-2 text-sm font-medium text-gray-900',
                            {
                              'bg-gray-100': active,
                            },
                          ])}
                        >
                          {type.name.charAt(0).toUpperCase()}
                          {type.name.substring(1)}
                        </button>
                      )}
                    </Menu.Item>
                  )
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
