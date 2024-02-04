import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreCreator } from 'redux-mock-store'
import { Pokemon } from '../components'

const initialState = {
  status: 'idle',
  pokemons: [],
  selectedPokemon: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  },
  error: null,
}

const queryClient = new QueryClient()
const mockStore: MockStoreCreator<ReturnType<() => typeof initialState>> =
  configureMockStore()

const renderPokemonModal = () => {
  const store = mockStore(initialState)

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Pokemon />
      </QueryClientProvider>
    </Provider>
  )

  return store
}

describe('Pokemon Modal', () => {
  it('should load Pokemon details', () => {
    renderPokemonModal()

    // Wait for the useQuery to fetch and display the Pokemon details
    waitFor(
      () => {
        const pokemonImage = screen.getByAltText('pikachu sprite')
        const pokemonTypes = screen.getByText('electric')

        expect(pokemonImage).toBeInTheDocument()
        expect(pokemonTypes).toBeInTheDocument()
      },
      { timeout: 100 }
    )
  })

  it('should unselected pokemon when closing modal', async () => {
    const store = renderPokemonModal()

    waitFor(
      () => {
        const closeBtn = screen.getByTestId('close-modal')
        fireEvent.click(closeBtn)

        // Check if the Pokemon is deselected in the store
        const actions = store.getActions()
        expect(actions).toContainEqual({
          type: 'pokemons/setSelectedPokemon',
          payload: null,
        })
      },
      { timeout: 100 }
    )
  })
})
