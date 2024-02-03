import { formatName } from '../../lib'
import type { IPokemon } from '../../lib/types'

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
