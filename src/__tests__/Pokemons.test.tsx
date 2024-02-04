import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreCreator } from 'redux-mock-store'
import { Pokemons } from '../components'
import { IPokemon } from '../lib/types'

const initialState = {
  pokemons: {
    status: 'succeeded',
    pokemons: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
      {
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
      },
      {
        name: 'venusaur',
        url: 'https://pokeapi.co/api/v2/pokemon/3/',
      },
    ],
    selectedPokemon: null as IPokemon | null,
    error: null,
  },
  pagination: {
    page: 0,
    limit: 20,
  },
}

const queryClient = new QueryClient()
const mockStore: MockStoreCreator<ReturnType<() => typeof initialState>> =
  configureMockStore()

const renderPokemons = (state = initialState) => {
  const store = mockStore(state)

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Pokemons pokemons={state.pokemons.pokemons} />
      </QueryClientProvider>
    </Provider>
  )

  return store
}
describe('Pokemons Listing Logic', () => {
  it('should display pokemons', () => {
    renderPokemons()

    const bulbasaur = screen.getByText('Bulbasaur')
    const ivysaur = screen.getByText('Ivysaur')
    const venusaur = screen.getByText('Venusaur')

    expect(bulbasaur).toBeInTheDocument()
    expect(ivysaur).toBeInTheDocument()
    expect(venusaur).toBeInTheDocument()
  })

  it('should set selected pokemon on click', () => {
    const store = renderPokemons()

    // Click on a Pokemon card li
    const bulbasaurCard = screen.getByText('Bulbasaur')
    const parentElement = bulbasaurCard.closest('li')
    if (parentElement) fireEvent.click(parentElement)

    // Check if the selected Pokemon is updated in the store
    const actions = store.getActions()
    expect(actions).toContainEqual({
      type: 'pokemons/setSelectedPokemon',
      payload: {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    })
  })

  it('should display loading state while fetching pokemons', () => {
    const customInitialState = Object.create(initialState)
    customInitialState.pokemons.status = 'loading'
    renderPokemons(customInitialState)

    // Check if the loading state is displayed
    const loadingMessage = screen.getByText('Summoning Pokémons')
    expect(loadingMessage).toBeInTheDocument()
  })

  it('should display empty state when no pokemons are present', () => {
    const customInitialState = Object.create(initialState)
    customInitialState.pokemons.pokemons = []
    renderPokemons(customInitialState)

    // Check if the "No Pokémons found" message is displayed
    waitFor(
      () => {
        const noPokemonsMessage = screen.getByText('No Pokémons found')
        expect(noPokemonsMessage).toBeInTheDocument()
      },
      { timeout: 100 }
    )
  })
})
