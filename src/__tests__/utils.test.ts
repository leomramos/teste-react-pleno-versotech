import { cn, formatName, validatePage } from '../lib'

describe('Utility Functions', () => {
  describe('formatName', () => {
    it('should capitalize the first letter of the name', () => {
      const result = formatName('bulbasaur')
      expect(result).toBe('Bulbasaur')
    })

    it('should use the placeholder for undefined name', () => {
      const result = formatName(undefined, 'Unknown')
      expect(result).toBe('Unknown')
    })
  })

  describe('cn', () => {
    it('should merge multiple sets of class values', () => {
      const result = cn([
        ['class1', 'class2'],
        'class3',
        {
          class4: true,
          class5: false,
        },
      ])
      expect(result).toBe('class1 class2 class3 class4')
    })
  })

  describe('validatePage', () => {
    it('should return a value within the valid range', () => {
      const result1 = validatePage(5, 10)
      expect(result1).toBe(5)

      const result2 = validatePage(-2, 10)
      expect(result2).toBe(0)

      const result3 = validatePage(15, 10)
      expect(result3).toBe(9)
    })
  })
})
