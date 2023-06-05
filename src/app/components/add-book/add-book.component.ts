import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book-service.service';
import { AuthorListItem } from 'src/app/types/author-list-item.interface';
import { BookListItem } from 'src/app/types/book-list-item.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {

  authorList: AuthorListItem[] = [];
  languageOptions = ['English', 'Japanese'];
  submitButtonDisabled: boolean = true;

  private destroy$ = new Subject<void>();

  newBookForm = this.fb.group({
    title: ['', Validators.required],
    author: [0, Validators.required],
    description: '',
    language: '',
    genre: '',
    pages: [0, Validators.required],
  });

  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.getAuthorList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((authorList: AuthorListItem[]) => this.authorList = authorList);

    this.newBookForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(formData => {
        this.submitButtonDisabled = !formData.title || !formData.author || !formData.pages;
      })
  }

  addNewBook() {
    const formData = this.newBookForm.value;
    this.bookService.addNewBook({
      author_id: formData.author as number,
      cover_image: '',
      pages: formData.pages as number,
      title: formData.title as string,
      isbn: '',
      releaseDate: ''
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BookListItem) => {
        this.router.navigate(['']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}