import { useState } from 'react'
import { Pokemons, Search, TypeSelector } from './components'
import { IPokemonType } from './types'

export default function App() {
  const [curType, setCurType] = useState<IPokemonType | null>(null)

  return (
    <div className='mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8 pb-12'>
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

        <TypeSelector curType={curType} setCurType={setCurType} />
      </section>

      <Pokemons />
    </div>
  )
}
