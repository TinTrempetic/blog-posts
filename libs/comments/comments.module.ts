import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsComponent } from './containers/comments/comments.component';
import { CommentsStateService } from './services/comments-state.service';

@NgModule({
  declarations: [CommentComponent, CommentsComponent],
  imports: [CommonModule],
  providers: [CommentsStateService],
  exports: [CommentsComponent],
})
export class CommentsModule {}
