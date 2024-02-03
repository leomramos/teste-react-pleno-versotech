export interface IAsyncSlice {
  status: 'idle' | 'loading' | 'fetching' | 'succeeded' | 'failed'
  error: null | Error
}

export type IInfoTab = {
  name: string
  key: string
}

export * from './pokemon'
export * from './type'
