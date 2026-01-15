import PokemonPreview from "./pokemon-preview"

interface Pokemon {
  name: string
  url: string
}

interface PokemonListProps {
  pokemonList: Pokemon[]
}

export default function PokemonList({ pokemonList }: PokemonListProps) {

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pokemonList.map((pokemon) => (
        <PokemonPreview key={pokemon.name} pokemonUrl={pokemon.url} />
      ))}
    </div>
  )
}