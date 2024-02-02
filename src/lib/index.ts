// Returns the name with the first letter capitalized or the provided placeholder if name is undefined
export const formatName = (
  name: string | undefined,
  placeholder: string = 'Unknown'
): string => {
  return name ? name.charAt(0).toUpperCase() + name.substring(1) : placeholder
}

import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combines multiple sets of class values and returns a merged class string
export const cn = (classes: ClassValue[]) => twMerge(clsx(classes))