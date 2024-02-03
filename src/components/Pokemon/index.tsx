import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cn, fetchData, formatName } from '../../lib'
import type { IInfoTab, IPokemon, IPokemonDetailed } from '../../lib/types'
import type { AppDispatch } from '../../store'
import { getSelectedPokemon, setSelectedPokemon } from '../../store/slices'
import { Tab, TabInfo } from './Tabs'

const tabs: IInfoTab[] = [
  { name: 'stats', key: 'stat' },
  { name: 'abilities', key: 'ability' },
  { name: 'moves', key: 'move' },
]

export const Pokemon = () => {
  const dispatch: AppDispatch = useDispatch()
  const selectedPokemon: IPokemon | null = useSelector(getSelectedPokemon)
  const [pokemon, setPokemon] = useState<IPokemonDetailed | null>(null)

  const [curTab, setCurTab] = useState(tabs[0])
  const [isShiny, setIsShiny] = useState(false)

  const deselectPokemon = () => {
    dispatch(setSelectedPokemon(null))
  }

  // Fetches detailed information about the selected Pokemon
  const fetchPokemon = useCallback(async () => {
    if (selectedPokemon?.url) {
      const data = await fetchData(selectedPokemon.url)
      setPokemon(data)

      // Checks a 10% chance for the Pokemon to be shiny
      setIsShiny(Math.random() < 0.1)
    }
  }, [setPokemon, selectedPokemon?.url])

  // Resets the state and fetches the new Pokemon when the selected Pokemon changes
  useEffect(() => {
    if (selectedPokemon) {
      setPokemon(null)
      setIsShiny(false)
      setCurTab(tabs[0])
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
              <Dialog.Panel
                className={cn([
                  'relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:max-w-sm flex flex-col w-full',
                  {
                    'ring-4 ring-inset ring-yellow-500 bg-amber-50': isShiny,
                  },
                ])}
              >
                <div className='absolute right-0 top-0 pr-4 pt-4'>
                  <button
                    type='button'
                    className='rounded-md text-gray-400 hover:text-gray-500'
                    onClick={deselectPokemon}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='flex flex-1 flex-col p-8'>
                  <img
                    className='mx-auto h-32 w-32 flex-shrink-0 rounded-full object-fill'
                    src={
                      pokemon?.sprites
                        ? pokemon.sprites[
                            isShiny ? 'front_shiny' : 'front_default'
                          ]
                        : ''
                    }
                    alt={`${pokemon?.name} sprite`}
                  />
                  <h3
                    className={cn([
                      'mt-2 text-xl font-medium',
                      {
                        'text-yellow-500 font-bold': isShiny,
                        'text-gray-900': !isShiny,
                      },
                    ])}
                  >
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
                      <Tab
                        key={tab.name}
                        tab={tab}
                        curTab={curTab}
                        setCurTab={setCurTab}
                        pokemon={pokemon}
                        isShiny={isShiny}
                      />
                    ))}
                  </nav>

                  <dl className='mt-8 grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 min-h-48 max-h-64 overflow-auto'>
                    {pokemon
                      ? pokemon[curTab.name]?.map((item, i) => (
                          <TabInfo key={i} content={item} curTab={curTab} />
                        ))
                      : null}
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
