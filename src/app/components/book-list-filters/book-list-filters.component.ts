import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilterState } from 'src/app/types/filter-state.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-list-filters',
  templateUrl: './book-list-filters.component.html',
  styleUrls: ['./book-list-filters.component.scss']
})
export class BookListFiltersComponent implements OnInit, OnDestroy {
  @Input() authorList: string[] = [];

  @Output() filterBooksByTitle = new EventEmitter<FilterState>();

  languageOptions = ['English', 'Japanese'];
  genreOptions = ['Drama', 'Fantastic'];

  private destroy$ = new Subject<void>();

  filterForm = this.fb.group<FilterState>({
    title: '',
    authors: [],
    languages: [],
    genres: [],
    pagesFrom: null,
    pagesTo: null
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(formData => {
        this.filterBooksByTitle.emit(formData as FilterState);
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}