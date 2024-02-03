import { cn } from '../../lib'
import type { IInfoTab, IPokemonDetailed, IPokemonInfo } from '../../lib/types'

export const Tab = ({
  tab,
  curTab,
  setCurTab,
  pokemon,
  isShiny,
}: {
  tab: IInfoTab
  curTab: IInfoTab
  setCurTab: React.Dispatch<React.SetStateAction<IInfoTab>>
  pokemon: IPokemonDetailed | null
  isShiny: boolean
}) => {
  return (
    <a
      key={tab.name}
      onClick={e => {
        e.preventDefault()
        setCurTab(tab)
      }}
      className={cn([
        'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium capitalize cursor-pointer',
        {
          'border-gray-900 text-gray-950': curTab.name === tab.name,
          'border-yellow-500': curTab.name === tab.name && isShiny,
          'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700':
            curTab.name !== tab.name,
        },
      ])}
      aria-current={curTab.name === tab.name ? 'page' : undefined}
    >
      {tab.name}
      {
        <span
          className={cn([
            'ml-1 rounded-full py-0.5 px-2 text-xs font-medium inline-block',
            {
              'bg-gray-200/30 text-gray-900': curTab === tab,
              'bg-gray-200/50 text-gray-700': curTab !== tab,
            },
          ])}
        >
          {pokemon && pokemon[tab.name]?.length}
        </span>
      }
    </a>
  )
}

export const TabInfo = ({
  content,
  curTab,
}: {
  content: IPokemonInfo
  curTab: IInfoTab
}) => (
  <div
    className={cn([
      'flex h-fit flex-col-reverse justify-center items-center border-gray-300 border-b pb-1.5',
      {
        'opacity-50': content.is_hidden,
      },
    ])}
  >
    <dt className='text-xs text-nowrap leading-7 text-gray-700 capitalize'>
      {content[curTab.key].name.replace('-', ' ')}
    </dt>
    {content.base_stat?.toString() ? (
      <dd className='text-md font-semibold tracking-tight text-gray-900'>
        {content.base_stat}
      </dd>
    ) : null}
  </div>
)
