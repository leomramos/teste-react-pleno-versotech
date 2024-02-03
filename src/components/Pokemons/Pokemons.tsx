import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { PokemonCard } from '.'
import { getLimit, getPage } from '../../store/slices'
import type { IPokemon } from '../../types'

export const Pokemons = ({ pokemons }: { pokemons: IPokemon[] }) => {
  const page = useSelector(getPage)
  const limit = useSelector(getLimit)
  const pokemonsStatus = useSelector(getPokemonsStatus)

  const offset = page * limit

  const paginatedPokemons = useMemo(() => {
    return pokemons.slice(offset, offset + limit)
  }, [pokemons, offset, limit])

  if (pokemonsStatus === 'loading') {
    return (
      <ArrowPathIcon
        className='my-auto h-5 w-5 animate-spin'
        aria-hidden='true'
      />
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
