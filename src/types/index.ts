export interface IAsyncSlice {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | Error
}

export * from './pokemon'
export * from './type'
