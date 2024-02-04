import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../..'
import { fetchData } from '../../../lib'
import type { IAsyncSlice, IPokemon } from '../../../lib/types'

interface IPokemonsSlice extends IAsyncSlice {
  pokemons: IPokemon[]
  selectedPokemon: IPokemon | null
}

const initialState: IPokemonsSlice = {
  status: 'idle',
  pokemons: [],
  selectedPokemon: null,
  error: null,
}

export const fetchPokemons = createAsyncThunk<IPokemon[], string | undefined>(
  'types/fetchPokemons',
  async (url = 'https://pokeapi.co/api/v2/pokemon?limit=9999', thunkAPI) => {
    try {
      // Fetch data and handle response format variations
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
    setSelectedPokemon: (state, action: PayloadAction<IPokemon | null>) => {
      state.selectedPokemon = action.payload
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPokemons.pending, state => {
        state.status = state.status === 'idle' ? 'loading' : 'fetching'
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
export const getSelectedPokemon = (state: RootState) =>
  state.pokemons.selectedPokemon

export const { setPokemons, setSelectedPokemon } = pokemonsSlice.actions

export const pokemonsReducer = pokemonsSlice.reducer
