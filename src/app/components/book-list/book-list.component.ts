import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookListItem } from 'src/app/types/book-list-item.interface';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {

  @Input() bookList: BookListItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {}

  openBookDetails(bookId: number) {
    this.router.navigate(['/book', bookId]);
  }
}
