export interface IAsyncSlice {
  status: 'idle' | 'loading' | 'fetching' | 'succeeded' | 'failed'
  error: null | Error
}

export * from './pokemon'
export * from './type'
