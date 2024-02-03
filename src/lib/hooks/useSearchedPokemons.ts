import { useSelector } from 'react-redux'
import { getPokemons, getQuery } from '../../store/slices'
import useFuzzySearch from './useFuzzySearch'

export default function useSearchedPokemons() {
  const pokemons = useSelector(getPokemons)
  const query = useSelector(getQuery)

  // Use the useFuzzySearch hook to filter pokemons based on the query
  // If there's a match, map over the results and return the normalized list of items; otherwise, return the original list
  return (
    useFuzzySearch({
      query,
      list: pokemons,
    })?.map(result => result.item) || pokemons
  )
}
