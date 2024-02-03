import { configureStore } from '@reduxjs/toolkit'
import {
  paginationReducer,
  pokemonsReducer,
  searchReducer,
  typesReducer,
} from './slices'

export const store = configureStore({
  reducer: {
    types: typesReducer,
    pokemons: pokemonsReducer,
    search: searchReducer,
    pagination: paginationReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
