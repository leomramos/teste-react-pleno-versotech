import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Returns the name with the first letter capitalized or the provided placeholder if name is undefined
export const formatName = (
  name: string | undefined,
  placeholder: string = 'Unknown'
): string => {
  return name ? name.charAt(0).toUpperCase() + name.substring(1) : placeholder
}

// Combines multiple sets of class values and returns a merged class string
export const cn = (classes: ClassValue[]) => twMerge(clsx(classes))

// Fetches data from the provided URL and returns the parsed JSON response
export const fetchData = async (url: string | URL) =>
  await fetch(url).then(res => res.json())

// Validates if page is within limits and returns a value within the valid range
export const validatePage = (page: number, pageCount: number) =>
  Math.min(Math.max(page, 0), pageCount - 1)
