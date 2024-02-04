import { cn, formatName } from '../../lib'
import type { IInfoTab, IPokemonDetailed } from '../../lib/types'
import { Tab, TabInfo } from './Tabs'

export function PokemonContent({
  pokemon,
  isShiny,
  tabs,
  curTab,
  setCurTab,
}: {
  pokemon: IPokemonDetailed | undefined
  isShiny: boolean
  tabs: IInfoTab[]
  curTab: IInfoTab
  setCurTab: React.Dispatch<React.SetStateAction<IInfoTab>>
}) {
  return (
    <div className='flex flex-1 flex-col p-8'>
      <img
        className='mx-auto h-32 w-32 flex-shrink-0 rounded-full object-fill'
        src={
          pokemon?.sprites
            ? pokemon.sprites[isShiny ? 'front_shiny' : 'front_default']
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
  )
}
