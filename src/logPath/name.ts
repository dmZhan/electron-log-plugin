export function generateFileName(path: string): string {
  const date = new Date()
  const str = path.replace(/\{(\w+)}/g, (substring, name) => {
    switch (name) {
      case 'y': return date.getFullYear().toString(10)
      case 'm': return (date.getMonth() + 1).toString(10).padStart(2, '0')
      case 'd': return date.getDate().toString(10).padStart(2, '0')

      default: {
        return substring
      }
    }
  })
  return `${str}.log` || ''
}
