import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book-service.service';
import { AuthorListItem } from 'src/app/types/author-list-item.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit, OnDestroy {

  authorList: AuthorListItem[] = [];
  newAuthorFormVisible: boolean = false;
  addAuthorButtonDisabled: boolean = true;
  editAuthorButtonDisabled: boolean = true;
  editingAuthorId: number | null = null;

  private destroy$ = new Subject<void>();

  newAuthorForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
  });

  editAuthorForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
  });

  constructor(private bookService: BookService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookService.getAuthorList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((authorList: AuthorListItem[]) => this.authorList = authorList);

    this.newAuthorForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(formData => {
        this.addAuthorButtonDisabled = !formData.name || !formData.surname;
      })

    this.editAuthorForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(formData => {
        console.log(formData);
        this.editAuthorButtonDisabled = !formData.name || !formData.surname;
    })
  }

  toggleNewAuthorForm() {
    this.newAuthorFormVisible = !this.newAuthorFormVisible;
  }

  addNewAuthor() {
    this.bookService.addNewAuthor(this.newAuthorForm.value as { name: string, surname: string })
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.newAuthorFormVisible = false;
        this.authorList.push(res);
      });
  }

  editAuthorInfo(author: AuthorListItem) {
    this.editAuthorForm.patchValue({
      name: author.name,
      surname: author.surname
    })
    this.editingAuthorId = author.id;
  }

  cancelAuthorEditing() {
    this.editingAuthorId = null;
  }

  saveAuthorInfo(authorId: number) {
    this.bookService.editAuthorInfo(authorId, this.editAuthorForm.value as { name: string, surname: string })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.authorList.splice(authorId - 1, 1, { 
          ...this.editAuthorForm.value as { name: string, surname: string }, 
          id: authorId
        });
        this.authorList = [...this.authorList];
        this.editingAuthorId = null;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}