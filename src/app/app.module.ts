import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BookListFiltersComponent } from './components/book-list-filters/book-list-filters.component';
import { BookListPageComponent } from './components/book-list-page/book-list-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent,
    BookListFiltersComponent,
    BookListPageComponent,
    AddBookComponent,
    AuthorListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
