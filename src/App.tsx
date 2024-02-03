import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Pagination,
  Pokemon,
  Pokemons,
  Search,
  TypeSelector,
} from './components'
import { useSearchedPokemons } from './lib/hooks'
import { IPokemon } from './lib/types'
import { AppDispatch } from './store'
import {
  fetchPokemons,
  fetchTypes,
  getPokemonsStatus,
  getTypesStatus,
} from './store/slices'

export default function App() {
  const dispatch: AppDispatch = useDispatch()

  const pokemonsStatus = useSelector(getPokemonsStatus)
  const typesStatus = useSelector(getTypesStatus)

  useEffect(() => {
    if (pokemonsStatus === 'idle') dispatch(fetchPokemons())
  }, [dispatch, pokemonsStatus])

  useEffect(() => {
    if (typesStatus === 'idle') dispatch(fetchTypes())
  }, [dispatch, typesStatus])

  const pokemons: IPokemon[] = useSearchedPokemons()

  return (
    <div className='mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8'>
      <div className='py-24'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
          Pokédex VersoTech
        </h1>
        <p className='mx-auto mt-4 max-w-3xl text-base text-gray-500'>
          Explore and learn more about your favorite Pokémons
        </p>
      </div>

      <section
        aria-labelledby='filter-heading'
        className='border-t border-gray-200 pt-6 pb-16 flex justify-between gap-6'
      >
        <Search />

        <h2 id='filter-heading' className='sr-only'>
          Pokemon filters
        </h2>

        <TypeSelector />
      </section>

      <Pokemons pokemons={pokemons} />
      <Pokemon />

      <Pagination pokemonsCount={pokemons.length} />
    </div>
  )
}
