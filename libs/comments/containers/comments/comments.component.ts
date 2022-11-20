import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommentsStateService } from 'libs/comments/services/comments-state.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Comment } from '../../types';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  @Input() showComments = false;

  @Input() postId: number;

  private loaded = new BehaviorSubject<number>(0);
  loaded$ = this.loaded
    .asObservable()
    .pipe(
      switchMap((postId) =>
        this.commentsState.getCommentsLoadedByPostId(postId)
      )
    );

  private commentsByPostId = new BehaviorSubject<number>(0);
  commentsByPostId$ = this.commentsByPostId.asObservable().pipe(
    tap(() => {
      this.commentsState.loadCommentsByPostId(this.postId);
    }),
    switchMap(() => this.commentsState.getCommentsByPostId(this.postId))
  );

  constructor(private commentsState: CommentsStateService) {}

  ngOnInit(): void {
    if (this.showComments) this.showCommentsHandler();
  }

  showCommentsHandler(): void {
    this.showComments = true;

    this.commentsByPostId.next(this.postId);
    this.loaded.next(this.postId);
  }

  trackById(index: number, item: Comment) {
    return item.id;
  }
}
