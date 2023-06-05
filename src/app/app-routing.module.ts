import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListPageComponent } from './components/book-list-page/book-list-page.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

const routes: Routes = [
  { path: '', component: BookListPageComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'author-list', component: AuthorListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
