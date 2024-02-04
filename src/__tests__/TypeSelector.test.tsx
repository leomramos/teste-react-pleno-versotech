import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreCreator } from 'redux-mock-store'
import { TypeSelector } from '../components'
import { IPokemonType } from '../lib/types'

const initialState = {
  types: [
    {
      name: 'fire',
      url: 'https://pokeapi.co/api/v2/type/10/',
    },
    {
      name: 'water',
      url: 'https://pokeapi.co/api/v2/type/11/',
    },
  ],
  curType: null as IPokemonType | null,
  typesStatus: 'succeeded',
}

const mockStore: MockStoreCreator<ReturnType<() => typeof initialState>> =
  configureMockStore()

const renderTypeSelector = (state = initialState) => {
  const store = mockStore(state)

  render(
    <Provider store={store}>
      <TypeSelector />
    </Provider>
  )

  return store
}

describe('TypeSelector Component', () => {
  it('should fetch and display types', () => {
    renderTypeSelector({
      types: [],
      curType: null,
      typesStatus: 'idle',
    })

    // Wait for the types to be fetched and displayed
    waitFor(
      () => {
        const fireType = screen.getByText('Fire')
        expect(fireType).toBeInTheDocument()
      },
      { timeout: 100 }
    )
  })

  it('should select a type from the dropdown', () => {
    const store = renderTypeSelector()

    const typeSelector = screen.getByText('Type')
    fireEvent.click(typeSelector)

    waitFor(
      () => {
        const fireType = screen.getByText('Fire')
        fireEvent.click(fireType)

        // Check if the selected type is updated in the store
        const actions = store.getActions()
        expect(actions).toEqual([
          {
            type: 'types/setCurType',
            payload: {
              name: 'fire',
              url: 'https://pokeapi.co/api/v2/type/10/',
            },
          },
        ])
      },
      { timeout: 100 }
    )
  })

  it('should clear the selected type', () => {
    const store = renderTypeSelector({
      types: [
        {
          name: 'fire',
          url: 'https://pokeapi.co/api/v2/type/10/',
        },
        {
          name: 'water',
          url: 'https://pokeapi.co/api/v2/type/11/',
        },
      ],
      curType: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
      typesStatus: 'succeeded',
    })

    waitFor(
      () => {
        const clearButton = screen.getByText('Clear')
        fireEvent.click(clearButton)

        // Check if the selected type is cleared in the store
        const actions = store.getActions()
        expect(actions).toEqual([{ type: 'types/setCurType', payload: null }])
      },
      { timeout: 100 }
    )
  })
})
