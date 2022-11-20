import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommentsModule } from 'libs/comments/comments.module';
import { SharedModule } from 'libs/shared/shared.module';
import { UsersModule } from 'libs/users/users.module';
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
  imports: [
    CommonModule,
    CommentsModule,
    UsersModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [BlogPostStateService],
})
export class BlogPostsModule {}
