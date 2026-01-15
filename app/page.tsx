"use client"

import { useState, useEffect, useRef } from "react"
import {
  SearchIcon,
} from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ModeToggle } from "@/components/ui/mode-toggle"
import PokemonList from "@/components/pokemon/pokemon-list"
import { getPokemonList } from "@/api/api"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  const [pokemonList, setPokemonList] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState(20)
  const observerTarget = useRef(null)

  useEffect(() => {
    getPokemonList().then((data) => {
      setPokemonList(data)
    })
  }, [])

  const filteredPokemonList = pokemonList?.filter((pokemon) => pokemon.name.includes(searchTerm))
  const visiblePokemonList = filteredPokemonList.slice(0, visibleCount)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 20)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [observerTarget])

  useEffect(() => {
    setVisibleCount(20)
  }, [searchTerm])

  console.log(filteredPokemonList)

  return (
    <main className="flex min-h-screen w-full flex-col items-center py-8 px-16 bg-white dark:bg-black sm:items-start">
      <header className="flex items-center justify-center w-full pb-8">
        <h1 className="text-4xl font-bold">Pokedex Inacap</h1>
      </header>
      <section className="flex items-center justify-between w-full">
        <div className="flex items-center w-full mr-4">
          <InputGroup>
            <InputGroupInput placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </section>
      <section className="w-full mt-8">
        <PokemonList pokemonList={visiblePokemonList} />
        <div ref={observerTarget} className="h-10 w-full" />
      </section>
    </main>
  );
}
