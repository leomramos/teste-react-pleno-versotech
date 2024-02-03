import type Fuse from 'fuse.js'
import type { FuseResult, IFuseOptions } from 'fuse.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Search<T> = {
  query: string
  list: T[]
  keys?: string[]
  limit?: number
  debounceSeconds?: number
  options?: IFuseOptions<T>
}

const defaultOptions = {
  ignoreLocation: false,
  threshold: 0.3,
}

export default function useFuzzySearch<T>({
  query,
  list = [],
  keys = ['name'],
  debounceSeconds = 0.4,
  options = {},
}: Search<T>): FuseResult<T>[] | null {
  const fuseOptions = useRef({ keys, ...defaultOptions, ...options })
  const fuse = useRef<Fuse<T> | null>(null)
  const [isFuseLoaded, setIsFuseLoaded] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  const searchList = useCallback(
    (query: string) => {
      if (!fuse.current) {
        ;(async () => {
          fuse.current = new (await import('fuse.js')).default(
            list,
            fuseOptions.current
          )
          setIsFuseLoaded(true)
        })()
      } else {
        fuse.current.setCollection(list)
      }

      return (isFuseLoaded && fuse.current?.search(query)) || null
    },
    [list, isFuseLoaded]
  )

  const memoizedFilteredResults = useMemo(() => {
    if (!debouncedQuery) {
      return null
    }

    return searchList(debouncedQuery)
  }, [searchList, debouncedQuery])

  useEffect(() => {
    if (!query) {
      setDebouncedQuery('')
      return
    }

    const timeout = setTimeout(() => {
      setDebouncedQuery(query)
    }, debounceSeconds * 1000)

    return () => clearTimeout(timeout)
  }, [query, debounceSeconds])

  return memoizedFilteredResults
}
