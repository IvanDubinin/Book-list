export interface FilterState {
  title: string,
  authors?: string[],
  languages?: string[],
  genres?: string[],
  pagesFrom?: number | null,
  pagesTo?: number | null
}