export interface BookListItem {
  author_id: number,
  cover_image: string,
  id: number,
  pages: number,
  title: string,
  isbn?: string,
  releaseDate?: string,
  author?: string,
  language?: string,
  genre?: string,
  description?: string
}