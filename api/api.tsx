import axios from "axios"

const API_BASE_URL = "https://pokeapi.co/api/v2"

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getPokemonList = async () => {
  return await axiosInstance.get("/pokemon?limit=10000")
    .then(({ data }) => data.results)
    .catch((error) => console.log(error))
}

export const getPokemonByUrl = async (url: string) => {
  return await axiosInstance.get(url)
    .then(({ data }) => data)
    .catch((error) => console.log(error))
}
