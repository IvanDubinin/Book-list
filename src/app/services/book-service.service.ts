import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookListItem } from '../types/book-list-item.interface';
import { AuthorListItem } from '../types/author-list-item.interface';

const baseUrl = 'https://my-json-server.typicode.com/dmitrijt9/book-api-mock';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookList: BookListItem[] = [];
  authorList: AuthorListItem[] = [];

  constructor(private http: HttpClient ) {}

  getBookList() {
    return this.http.get<BookListItem[]>(`${baseUrl}/books`);
  }

  getAuthorList() {
    return this.http.get<AuthorListItem[]>(`${baseUrl}/authors`);
  }

  addNewBook(newBook: Partial<BookListItem>) {
    return this.http.post<BookListItem>(`${baseUrl}/books`, newBook);
  }

  addNewAuthor(author: { name: string, surname: string }) {
    return this.http.post<AuthorListItem>(`${baseUrl}/authors`, author);
  }

  editAuthorInfo(authorId: number, newData: { name: string, surname: string }) {
    return this.http.put<AuthorListItem>(`${baseUrl}/authors/${authorId}`, newData);
  }
}