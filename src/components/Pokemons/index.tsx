import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { formatName } from '../../lib'
import { getLimit, getPage } from '../../store/slices'
import type { IPokemon } from '../../types'

export const Pokemons = ({ pokemons }: { pokemons: IPokemon[] }) => {
  const page = useSelector(getPage)
  const limit = useSelector(getLimit)

  const offset = page * limit

  const paginatedPokemons = useMemo(() => {
    return pokemons.slice(offset, offset + limit)
  }, [pokemons, offset, limit])

  if (pokemons.length === 0) {
    return (
      <div className='text-center pb-16'>
        <MagnifyingGlassIcon className='mx-auto h-12 w-12 text-gray-400' />
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>
          No Pokémons found
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          Try looking for another name or type
        </p>
      </div>
    )
  }

  return (
    <motion.ul
      layout
      layoutRoot
      role='list'
      className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-4 pb-16'
    >
      <AnimatePresence mode='popLayout'>
        {paginatedPokemons.map((pokemon: IPokemon) => (
          <motion.li layout key={pokemon.name}>
            <PokemonCard {...pokemon} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}

export const PokemonCard = ({ name }: IPokemon) => {
  return (
    <div className='group relative overflow-hidden col-span-1 rounded-lg bg-white shadow cursor-pointer p-6'>
      <div className='absolute inset-0 bg-gradient-to-r from-zinc-800 to-gray-950 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300' />

      <h3 className='truncate text-lg font-medium relative z-10 text-gray-900 group-hover:text-white transition-all duration-300'>
        {formatName(name)}
      </h3>
    </div>
  )
}
