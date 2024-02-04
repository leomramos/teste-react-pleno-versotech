import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreCreator } from 'redux-mock-store'
import { Pagination } from '../components/Pagination'

const initialStoreState = {
  pagination: {
    page: 0,
    limit: 20,
  },
}

const mockStore: MockStoreCreator<ReturnType<() => typeof initialStoreState>> =
  configureMockStore()

const renderPagination = (initialState = initialStoreState) => {
  const store = mockStore(initialState)

  render(
    <Provider store={store}>
      <Pagination pokemonsCount={100} />
    </Provider>
  )

  return store
}

describe('Pagination Component', () => {
  it('should render the correct number of cards per page', () => {
    renderPagination()

    waitFor(
      () => {
        const updatedCards = screen.queryAllByTestId('pokemon-card')
        expect(updatedCards.length).toBe(initialStoreState.pagination.limit)
      },
      { timeout: 100 }
    ) // Wait for the cards to update
  })

  it('should handle manual page input correctly and update the store', () => {
    const store = renderPagination()
    const mobilePageSelector: HTMLInputElement = screen.getByTestId(
      'mobile-page-selector'
    )
    const newPage = 3

    fireEvent.change(mobilePageSelector, {
      target: { value: newPage.toString() },
    })

    fireEvent.blur(mobilePageSelector)

    const actions = store.getActions()
    expect(actions).toContainEqual({
      type: 'pagination/setPage',
      payload: newPage - 1,
    })
  })

  it('should handle manual page input correctly and update the store, preventing page from going below 0', () => {
    const store = renderPagination()

    const mobilePageSelector: HTMLInputElement = screen.getByTestId(
      'mobile-page-selector'
    )

    const negativePage = -1
    fireEvent.change(mobilePageSelector, {
      target: { value: negativePage.toString() },
    })

    fireEvent.blur(mobilePageSelector)

    const actionsNegativePage = store.getActions()
    expect(actionsNegativePage).toContainEqual({
      type: 'pagination/setPage',
      payload: 0, // The page should not go below 0
    })
  })

  it('should change the limit correctly, adjust the page if over the limit, and update the store', async () => {
    const store = renderPagination()
    const newLimit = 12

    const limitSelector = screen.getByTestId('limit-selector')

    fireEvent.change(limitSelector, {
      target: { value: newLimit.toString() },
    })

    const actions = store.getActions()
    const expectedPage = Math.min(
      initialStoreState.pagination.page,
      Math.ceil(100 / newLimit) - 1
    )

    expect(actions).toContainEqual({
      type: 'pagination/setLimit',
      payload: newLimit,
    })

    const mobilePageSelector: HTMLInputElement = screen.getByTestId(
      'mobile-page-selector'
    )

    expect(store.getState().pagination.page).toBe(expectedPage)
    expect(mobilePageSelector.value).toBe((expectedPage + 1).toString())

    waitFor(
      () => {
        const updatedCards = screen.queryAllByTestId('pokemon-card')
        expect(updatedCards.length).toBe(newLimit)
      },
      { timeout: 100 }
    ) // Wait for the cards to update
  })
})
