import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreCreator } from 'redux-mock-store'
import { Search } from '../components'

const initialState = {
  search: {
    query: '',
  },
}

const mockStore: MockStoreCreator<ReturnType<() => typeof initialState>> =
  configureMockStore()

describe('Search Component', () => {
  it('should update the query on input change', () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    )

    const searchInput = screen.getByPlaceholderText('Search')
    fireEvent.change(searchInput, { target: { value: 'Pikachu' } })

    const actions = store.getActions()
    expect(actions).toEqual([{ type: 'search/setQuery', payload: 'Pikachu' }])
  })
})
