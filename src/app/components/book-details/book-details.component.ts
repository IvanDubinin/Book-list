import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book-service.service';
import { BookListItem } from 'src/app/types/book-list-item.interface';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book: BookListItem | null = null;

  constructor(private activateRoute: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    const bookId = +this.activateRoute.snapshot.params['id'];
    this.book = this.bookService.bookList.find(book => book.id === bookId) as BookListItem;
  }
}
