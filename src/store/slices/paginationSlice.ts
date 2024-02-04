import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

interface IPaginationSlice {
  page: number
  limit: number
}

const initialState: IPaginationSlice = {
  page: 0,
  limit: 20,
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
  },
})

export const getPage = (state: RootState) => state.pagination.page
export const getLimit = (state: RootState) => state.pagination.limit

export const { setPage, setLimit } = paginationSlice.actions

export const paginationReducer = paginationSlice.reducer
