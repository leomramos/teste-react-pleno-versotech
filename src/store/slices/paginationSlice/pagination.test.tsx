import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { getLimit, getPage, paginationReducer, setLimit, setPage } from '.'

describe('paginationSlice', () => {
  let store: EnhancedStore

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pagination: paginationReducer,
      },
    })
  })

  it('should set the page correctly', () => {
    const newPage: number = 2
    store.dispatch(setPage(newPage))

    const state = store.getState().pagination
    expect(state.page).toBe(newPage)
  })

  it('should set the limit correctly', () => {
    const newLimit: number = 30
    store.dispatch(setLimit(newLimit))

    const state = store.getState().pagination
    expect(state.limit).toBe(newLimit)
  })

  it('should select the current page from the store', () => {
    const currentPage: number = 3
    store.dispatch(setPage(currentPage))

    const selectedPage: number = getPage(store.getState())
    expect(selectedPage).toBe(currentPage)
  })

  it('should select the current limit from the store', () => {
    const currentLimit: number = 50
    store.dispatch(setLimit(currentLimit))

    const selectedLimit: number = getLimit(store.getState())
    expect(selectedLimit).toBe(currentLimit)
  })
})
