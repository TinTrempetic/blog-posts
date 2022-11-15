import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PostListFiltersComponent } from './components/post-list-filters/post-list-filters.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './containers/post-list/post-list.component';
import { PostComponent } from './containers/post/post.component';
import { PostsFacade } from './facade/posts.facade';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    LayoutComponent,
    HeaderComponent,
    PostListItemComponent,
    PostListFiltersComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  providers: [PostsFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
