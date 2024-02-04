import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../..'

interface ISearchSlice {
  query: string
}

const initialState: ISearchSlice = {
  query: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
  },
})

export const getQuery = (state: RootState) => state.search.query

export const { setQuery } = searchSlice.actions

export const searchReducer = searchSlice.reducer
