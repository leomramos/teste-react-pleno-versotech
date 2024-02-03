import { useSelector } from 'react-redux'
import { getPokemons, getQuery } from '../../store/slices'
import useFuzzySearch from './useFuzzySearch'

export default function useSearchedPokemons() {
  const pokemons = useSelector(getPokemons)
  const query = useSelector(getQuery)

  return (
    useFuzzySearch({
      query,
      list: pokemons,
    })?.map(i => i.item) || pokemons
  )
}
