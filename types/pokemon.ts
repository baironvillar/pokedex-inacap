export interface PokemonListResult {
  name: string
  url: string
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonSprites {
  front_default: string
  other: {
    "official-artwork": {
      front_default: string
    }
  }
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: PokemonSprites
}
