import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../..'
import type { IAsyncSlice, IPokemonType } from '../../../lib/types'

interface ITypesSlice extends IAsyncSlice {
  curType: null | IPokemonType
  types: IPokemonType[]
}

const initialState: ITypesSlice = {
  status: 'idle',
  curType: null,
  types: [],
  error: null,
}

export const fetchTypes = createAsyncThunk(
  'types/fetchTypes',
  async (_, thunkAPI) => {
    try {
      const data = await fetch('https://pokeapi.co/api/v2/type').then(res =>
        res.json()
      )
      return data.results
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setCurType: (state, action) => {
      state.curType = action.payload
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchTypes.pending, state => {
        state.status = state.status === 'idle' ? 'loading' : 'fetching'
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.types = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchTypes.rejected, state => {
        state.status = 'failed'
      }),
})

export const getCurType = (state: RootState) => state.types.curType
export const getTypes = (state: RootState) => state.types.types
export const getTypesStatus = (state: RootState) => state.types.status
export const getTypesError = (state: RootState) => state.types.error

export const { setCurType } = typesSlice.actions

export const typesReducer = typesSlice.reducer
