import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListFiltersComponent } from './components/post-list-filters/post-list-filters.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './containers/post-list/post-list.component';
import { PostComponent } from './containers/post/post.component';
import { BlogPostStateService } from './services/blog-posts-state.service';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', pathMatch: 'full', component: PostListComponent },
  { path: 'post/:postId', pathMatch: 'full', component: PostComponent },
];

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    PostListFiltersComponent,
    PostListItemComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [BlogPostStateService],
})
export class BlogPostsModule {}
