import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book-service.service';
import { AuthorListItem } from 'src/app/types/author-list-item.interface';
import { BookListItem } from 'src/app/types/book-list-item.interface';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FilterState } from 'src/app/types/filter-state.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss']
})
export class BookListPageComponent implements OnInit, OnDestroy {

  bookList: BookListItem [] = [];
  authorList: string[] = [];
  private initialBookList: BookListItem [] = [];

  private destroy$ = new Subject<void>();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAuthorList().pipe(
      switchMap((authorList: AuthorListItem[]) => {
        this.bookService.authorList = [...authorList];
        this.authorList = authorList.map(author => `${author.name} ${author.surname}`);
        return this.bookService.getBookList();
      }),
      takeUntil(this.destroy$)
    ).subscribe(bookList => {
      this.bookList = bookList
        .map(bookListItem => {
          return {
            ...bookListItem,
            author: this.authorList[bookListItem.author_id - 1],
            language: bookListItem.author_id % 2 ? 'English' : 'Japanese',
            genre: bookListItem.author_id % 3 ? 'Drama' : 'Fantastic',
            description: `As a panicked world goes into lockdown, 
            Lucy Barton is uprooted from her life in Manhattan and bundled 
            away to a small town in Maine by her ex-husband and on-again, 
            off-again friend, Willia...`
          }
        })
      this.initialBookList = [...this.bookList];
      this.bookService.bookList = [...this.bookList];
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBookFilter(filterState: FilterState) {
    let filteredBookList = this.initialBookList;

    if (filterState.title) {
      const titleInLowerCase = filterState.title.toLowerCase();
      filteredBookList = filteredBookList.filter(book => {
        return book.title.toLowerCase().includes(titleInLowerCase) || book.description?.toLowerCase().includes(titleInLowerCase);
      })
    }

    if (filterState.authors?.length) {
      filteredBookList = filteredBookList.filter(book => {
        return (filterState.authors as string[]).includes(book.author as string);
      })
    }

    if (filterState.languages?.length) {
      filteredBookList = filteredBookList.filter(book => {
        return (filterState.languages as string[]).includes(book.language as string);
      })
    }

    if (filterState.genres?.length) {
      filteredBookList = filteredBookList.filter(book => {
        return (filterState.genres as string[]).includes(book.genre as string);
      })
    }

    if (filterState.pagesFrom) {
      filteredBookList = filteredBookList.filter(book => {
        return book.pages >= (filterState.pagesFrom as number);
      })
    }

    if (filterState.pagesTo) {
      filteredBookList = filteredBookList.filter(book => {
        return book.pages <= (filterState.pagesTo as number);
      })
    }

    this.bookList = filteredBookList;
  }
}