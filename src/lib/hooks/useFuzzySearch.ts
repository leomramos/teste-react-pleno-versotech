import type Fuse from 'fuse.js'
import type { FuseResult, IFuseOptions } from 'fuse.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Define the shape of the search object, including optional parameters
type Search<T> = {
  query: string
  list: T[]
  keys?: string[]
  limit?: number
  debounceSeconds?: number
  options?: IFuseOptions<T>
}

// Default Fuse.js options for fuzzy searching
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
  // Creates ref for Fuse.js options and instance
  const fuseOptions = useRef({ keys, ...defaultOptions, ...options })
  const fuse = useRef<Fuse<T> | null>(null)

  const [isFuseLoaded, setIsFuseLoaded] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  //  Memoized searchList function
  const searchList = useCallback(
    (query: string) => {
      // Initialize Fuse.js if not already loaded or if it's not present
      if (!isFuseLoaded || !fuse.current) {
        ;(async () => {
          fuse.current = new (await import('fuse.js')).default(
            list,
            fuseOptions.current
          )
          setIsFuseLoaded(true)
        })()
      } else {
        // Update the collection if Fuse.js is already loaded
        fuse.current.setCollection(list)
      }

      // Perform the search and return results or null if no results
      return fuse.current?.search(query) || null
    },
    [list, isFuseLoaded]
  )

  // Memoized filtered results
  const memoizedFilteredResults = useMemo(() => {
    // Return null if the query is empty
    if (!debouncedQuery) {
      return null
    }

    // Perform the search and return results
    return searchList(debouncedQuery)
  }, [searchList, debouncedQuery])

  // Handle debouncing of the query
  useEffect(() => {
    // Clear the debounced query if the main query is empty
    if (!query) {
      setDebouncedQuery('')
      return
    }

    // Set a timeout to update the debounced query after a delay
    const timeout = setTimeout(() => {
      setDebouncedQuery(query)
    }, debounceSeconds * 1000)

    // Cleanup function to clear the timeout on query change
    return () => clearTimeout(timeout)
  }, [query, debounceSeconds])

  // Return the memoized filtered results
  return memoizedFilteredResults
}
