import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn, fetchData, formatName } from '../../lib'
import { IPokemon } from '../../lib/types'
import { AppDispatch } from '../../store'
import { getSelectedPokemon, setSelectedPokemon } from '../../store/slices'

const tabs = [
  { name: 'stats', key: 'stat' },
  { name: 'abilities', key: 'ability' },
  { name: 'moves', key: 'move' },
]

export const Pokemon = () => {
  const dispatch: AppDispatch = useDispatch()
  const selectedPokemon: IPokemon | null = useSelector(getSelectedPokemon)
  const [pokemon, setPokemon] = useState({})

  const [curTab, setCurTab] = useState(tabs[0])

  const deselectPokemon = () => {
    dispatch(setSelectedPokemon(null))
  }

  const fetchPokemon = useCallback(async () => {
    if (selectedPokemon?.url) {
      const data = await fetchData(selectedPokemon.url)
      setPokemon(data)
    }
  }, [setPokemon, selectedPokemon?.url])

  useEffect(() => {
    if (selectedPokemon) {
      fetchPokemon()
    }
  }, [fetchPokemon, selectedPokemon])

  return (
    <Transition.Root show={Boolean(selectedPokemon)} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={deselectPokemon}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:max-w-sm flex flex-col divide-y divide-gray-200 w-full'>
                <div className='absolute right-0 top-0 pr-4 pt-4'>
                  <button
                    type='button'
                    className='rounded-md bg-white text-gray-400 hover:text-gray-500'
                    onClick={deselectPokemon}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='flex flex-1 flex-col p-8'>
                  <img
                    className='mx-auto h-32 w-32 flex-shrink-0 rounded-full object-fill'
                    src={pokemon?.sprites?.front_default}
                    alt=''
                  />
                  <h3 className='mt-2 text-xl font-medium text-gray-900'>
                    {formatName(pokemon?.name)}
                  </h3>
                  <ul className={'divide-x divide-gray-500 flex mx-auto mt-2'}>
                    {pokemon?.types?.map(({ type }) => (
                      <li
                        key={type.name}
                        className='capitalize px-2 font-normal text-sm text-gray-700'
                      >
                        {type.name}
                      </li>
                    ))}
                  </ul>
                  <nav
                    className='-mb-px mt-4 flex flex-wrap justify-center gap-x-8 mx-auto'
                    aria-label='Tabs'
                  >
                    {tabs.map(tab => (
                      <a
                        key={tab.name}
                        onClick={e => {
                          e.preventDefault()
                          setCurTab(tab)
                        }}
                        className={cn([
                          'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium capitalize',
                          {
                            'border-gray-900 text-gray-950':
                              curTab.name === tab.name,
                            'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700':
                              curTab.name !== tab.name,
                          },
                        ])}
                        aria-current={
                          curTab.name === tab.name ? 'page' : undefined
                        }
                      >
                        {tab.name}
                        {
                          <span
                            className={cn([
                              'ml-1 rounded-full py-0.5 px-2 text-xs font-medium inline-block',
                              {
                                'bg-gray-200 text-gray-900': curTab === tab,
                                'bg-gray-100 text-gray-900': curTab !== tab,
                              },
                            ])}
                          >
                            {pokemon[tab.name]?.length}
                          </span>
                        }
                      </a>
                    ))}
                  </nav>

                  <dl className='mt-8 grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 min-h-48 max-h-64 overflow-auto'>
                    {pokemon[curTab.name]?.map((item, i) => (
                      <div
                        key={i}
                        className='flex h-fit flex-col-reverse justify-center items-center border-gray-300 border-b pb-1.5'
                      >
                        <dt className='text-xs text-nowrap leading-7 text-gray-700 capitalize'>
                          {item[curTab.key].name.replace('-', ' ')}
                        </dt>
                        {item.base_stat?.toString() ? (
                          <dd className='text-md font-semibold tracking-tight text-gray-900'>
                            {item.base_stat}
                          </dd>
                        ) : null}
                      </div>
                    ))}
                  </dl>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
