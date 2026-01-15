import React, { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardImage, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPokemonByUrl } from "@/api/api"
import { useRouter } from 'next/navigation'

export default function PokemonPreview({ pokemonUrl }: { pokemonUrl: string }) {

  const [pokemon, setPokemon] = React.useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    getPokemonByUrl(pokemonUrl).then((data) => {
      setPokemon(data)
    })
  }, [])

  if (!pokemon) {
    return (
      <Card className="w-full h-full">
        <CardHeader className="flex flex-col w-full items-start">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <CardImage className="flex w-full items-center justify-center">
            <Skeleton className="size-56 rounded-full" />
          </CardImage>
          <div className="flex flex-col items-start justify-start gap-2 w-full mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card key={pokemonUrl} className="w-full hover:scale-105 transition-all cursor-pointer" onClick={() => router.push(`/pokemon/${pokemon?.id}`)}>
      <CardHeader className="flex flex-col w-full items-start">
        <CardTitle className="capitalize">{pokemon?.name} n°{pokemon?.id}</CardTitle>
        <CardImage className="flex w-full items-center justify-center">
          {pokemon?.sprites.other["official-artwork"].front_default && (
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} className="size-56" />
          )}
        </CardImage>
        <CardDescription className="flex flex-col items-start justify-start gap-2">
          <p>Tipos: {pokemon?.types.map((type: any) => type.type.name).join(", ")}</p>
          <p>Altura: {pokemon?.height / 10} m</p>
          <p>Peso: {pokemon?.weight / 10} kg</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}