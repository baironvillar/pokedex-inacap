"use client"

import { getPokemonByUrl } from "@/api/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function PokemonPage() {
  const params = useParams()
  const [pokemon, setPokemon] = useState<any>(null)

  useEffect(() => {
    getPokemonByUrl(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId as string}`).then((data) => {
      setPokemon(data)
    })
  }, [])

  if (!pokemon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl font-medium">Cargando Pokémon...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-black/90 p-8 transition-colors">
      <div className="mx-auto max-w-5xl space-y-8">

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{pokemon.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 md:grid-cols-2">

          <Card className="flex flex-col items-center justify-center border-none bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-900 dark:to-slate-800 shadow-xl lg:h-[500px]">
            <CardHeader>
              <CardTitle className="sr-only">{pokemon.name} Image</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-10">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="size-64 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110 sm:size-80"
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight capitalize text-slate-900 dark:text-white sm:text-6xl">
                {pokemon.name}
              </h1>
              <p className="mt-2 text-2xl font-medium text-slate-500 dark:text-slate-400">
                #{String(pokemon.id).padStart(3, "0")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type: any) => (
                <span
                  key={type.type.name}
                  className="rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm"
                  style={{
                    backgroundColor: getTypeColor(type.type.name),
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Altura</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pokemon.height / 10} m</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Peso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pokemon.weight / 10} kg</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold">Estadísticas Base</h3>
              <div className="space-y-3">
                {pokemon.stats.map((stat: any) => (
                  <div key={stat.stat.name} className="space-y-1.5">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="capitalize text-slate-600 dark:text-slate-300">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="font-bold">{stat.base_stat}</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${Math.min(stat.base_stat, 100)}%`,
                          backgroundColor: getStatColor(stat.base_stat),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions for colors
function getTypeColor(type: string) {
  const colors: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  }
  return colors[type] || "#777"
}

function getStatColor(value: number) {
  if (value >= 100) return "#22c55e" // green-500
  if (value >= 80) return "#84cc16" // lime-500
  if (value >= 60) return "#eab308" // yellow-500
  if (value >= 40) return "#f97316" // orange-500
  return "#ef4444" // red-500
}