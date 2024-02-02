import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { fetchData } from '../../lib'
import type { IAsyncSlice, IPokemon } from '../../types'

interface IPokemonsSlice extends IAsyncSlice {
  pokemons: IPokemon[]
}

const initialState: IPokemonsSlice = {
  status: 'idle',
  pokemons: [],
  error: null,
}

export const fetchPokemons = createAsyncThunk<IPokemon[], string | undefined>(
  'types/fetchPokemons',
  async (url = 'https://pokeapi.co/api/v2/pokemon?limit=9999', thunkAPI) => {
    try {
      const res = await fetchData(url)
      return (
        res.results || res.pokemon.map((p: { pokemon: IPokemon }) => p.pokemon)
      )
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const pokemonsSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<IPokemon[]>) => {
      state.pokemons = action.payload
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPokemons.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.pokemons = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchPokemons.rejected, state => {
        state.status = 'failed'
      }),
})

export const getPokemons = (state: RootState) => state.pokemons.pokemons
export const getPokemonsStatus = (state: RootState) => state.pokemons.status
export const getPokemonsError = (state: RootState) => state.pokemons.error

export const { setPokemons } = pokemonsSlice.actions

export const pokemonsReducer = pokemonsSlice.reducer
