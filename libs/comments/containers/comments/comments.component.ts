import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentsStateService } from 'libs/comments/services/comments-state.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Comment } from '../../types';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  showComments = false;

  @Input() postId: number;

  private loaded = new BehaviorSubject<number>(0);
  loaded$ = this.loaded
    .asObservable()
    .pipe(switchMap((postId) => this.store.getCommentsLoadedByPostId(postId)));

  private commentsByPostId = new BehaviorSubject<number>(0);
  commentsByPostId$ = this.commentsByPostId.asObservable().pipe(
    tap(() => {
      this.store.loadCommentsByPostId(this.postId);
    }),
    switchMap(() => this.store.getCommentsByPostId(this.postId))
  );

  constructor(private store: CommentsStateService) {}

  showCommentsHandler(): void {
    this.showComments = true;

    this.commentsByPostId.next(this.postId);
    this.loaded.next(this.postId);
  }

  trackById(index: number, item: Comment) {
    return item.id;
  }
}
