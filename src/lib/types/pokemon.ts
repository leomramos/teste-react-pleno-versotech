type IInfo = {
  name: string
  url: string
}

export type IPokemon = IInfo

export type IPokemonInfo = Record<string, IInfo> & {
  base_stat?: number
  is_hidden?: boolean
}

export type IPokemonDetailed = Record<string, IPokemonInfo[]> & {
  id: number
  name: string
  sprites: {
    front_default: string
    front_shiny: string
  }
}
