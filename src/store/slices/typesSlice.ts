import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { IPokemonType } from '../../types'

interface ITypesSlice {
  status: 'idle' | 'loading' | 'succeded' | 'failed'
  curType: null | IPokemonType
  types: IPokemonType[]
  error: null | Error
}

const initialState: ITypesSlice = {
  status: 'idle',
  curType: null,
  types: [],
  error: null,
}

export const fetchTypes = createAsyncThunk('types/fetchTypes', async () => {
  try {
    const data = await fetch('https://pokeapi.co/api/v2/type').then(res =>
      res.json()
    )
    return data.results
  } catch (err) {
    return err
  }
})

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
        state.status = 'loading'
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.status = 'succeded'
        state.types = action.payload
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
