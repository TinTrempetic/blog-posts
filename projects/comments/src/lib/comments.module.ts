import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsComponent } from './containers/comments/comments.component';

@NgModule({
  declarations: [CommentComponent, CommentsComponent],
  imports: [CommonModule],
  exports: [CommentsComponent],
})
export class CommentsModule {}
