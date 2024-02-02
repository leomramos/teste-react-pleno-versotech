import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatName } from '../../lib'
import { AppDispatch } from '../../store'
import {
  fetchPokemons,
  getPokemons,
  getPokemonsStatus,
} from '../../store/slices'
import type { IPokemon } from '../../types'

export const Pokemons = () => {
  const dispatch: AppDispatch = useDispatch()

  const pokemonsStatus = useSelector(getPokemonsStatus)

  useEffect(() => {
    if (pokemonsStatus === 'idle') dispatch(fetchPokemons())
  }, [dispatch, pokemonsStatus])

  const pokemons = useSelector(getPokemons)

  return (
    <motion.ul
      layout
      layoutRoot
      role='list'
      className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-4'
    >
      <AnimatePresence mode='popLayout'>
        {pokemons.slice(0, 20).map((pokemon, index) => (
          <PokemonCard key={pokemon.name + index} {...pokemon} />
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}

export const PokemonCard = ({ name }: IPokemon) => {
  return (
    <motion.li
      layout
      className='group relative overflow-hidden col-span-1 rounded-lg bg-white shadow cursor-pointer p-6'
    >
      <div className='absolute inset-0 bg-gradient-to-r from-zinc-800 to-gray-950 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300' />

      <h3 className='truncate text-lg font-medium relative z-10 text-gray-900 group-hover:text-white transition-all duration-300'>
        {formatName(name)}
      </h3>
    </motion.li>
  )
}
