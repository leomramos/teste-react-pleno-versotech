import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { cn, fetchData } from '../../lib'
import type { IInfoTab, IPokemon, IPokemonDetailed } from '../../lib/types'
import type { AppDispatch } from '../../store'
import { getSelectedPokemon, setSelectedPokemon } from '../../store/slices'
import { PokemonContent } from './PokemonContent'
import { SkeletonLoader } from './SkeletonLoader'

const tabs: IInfoTab[] = [
  { name: 'stats', key: 'stat' },
  { name: 'abilities', key: 'ability' },
  { name: 'moves', key: 'move' },
]

export const Pokemon = () => {
  const dispatch: AppDispatch = useDispatch()
  const selectedPokemon: IPokemon | null = useSelector(getSelectedPokemon)

  const [curTab, setCurTab] = useState(tabs[0])
  const [isShiny, setIsShiny] = useState(false)

  const deselectPokemon = () => {
    dispatch(setSelectedPokemon(null))

    // Reset the shiny and tab state after the dialog closes
    setTimeout(() => {
      setCurTab(tabs[0])
      setIsShiny(false)
    }, 300)
  }

  // Use useQuery to fetch and cache detailed Pokemon data and handle loading states
  const { data: pokemon, isFetching } = useQuery<IPokemonDetailed>(
    ['pokemon', selectedPokemon?.url],
    async () => await fetchData(selectedPokemon?.url as string),
    {
      enabled: Boolean(selectedPokemon?.url), // Only enable the query if a selectedPokemon URL is present
      keepPreviousData: true,
    }
  )

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
                {isFetching ? (
                  <SkeletonLoader />
                ) : (
                  <PokemonContent
                    pokemon={pokemon}
                    isShiny={isShiny}
                    tabs={tabs}
                    curTab={curTab}
                    setCurTab={setCurTab}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
