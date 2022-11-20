import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommentsStateService } from 'libs/comments/services/comments-state.service';
import { BehaviorSubject, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  showComments = false;

  @Input() postId: number;

  private commentsByPostId = new BehaviorSubject<number>(0);
  commentsByPostId$ = this.commentsByPostId.asObservable().pipe(
    distinctUntilChanged(),
    tap(() => this.store.loadCommentsByPostId(this.postId)),
    switchMap(() => this.store.getCommentsByPostId(this.postId))
  );

  constructor(private store: CommentsStateService) {}

  ngOnInit(): void {}

  showCommentsHandler(): void {
    this.showComments = true;

    this.commentsByPostId.next(this.postId);
  }
}
