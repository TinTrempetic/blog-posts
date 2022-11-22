import { Injectable } from '@angular/core';
import { Comment, CommentsHttpService } from 'projects/comments';
import { StateService } from 'projects/shared';
import {
  combineLatest,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
interface CommentsState {
  comments: Map<number, Comment[]>;
}

const initialState: CommentsState = {
  comments: new Map<number, Comment[]>(),
};

@Injectable({ providedIn: 'root' })
export class CommentsStateService extends StateService<CommentsState> {
  private loadedCommentsPostIds: number[] = [];

  private allComments$ = this.select((state) => state.comments);

  private _loadCommentsByPostIdAction = new Subject<number>();
  private loadCommentsByPostIdAction$ = this._loadCommentsByPostIdAction
    .asObservable()
    .pipe(
      filter((postId) => !this.loadedCommentsPostIds.includes(postId)),
      mergeMap((postId) => {
        if (postId === 0) return of([]);

        return this.service.getCommentsByPostId(postId);
      })
    );

  private setCommentsState$ = combineLatest([
    this.allComments$,
    this.loadCommentsByPostIdAction$,
  ]).pipe(
    map(([comments, loadedComments]) => {
      return {
        comments,
        loadedComments,
      };
    }),
    filter(({ loadedComments }) => !!loadedComments.length),
    switchMap(({ comments, loadedComments }) => {
      const allComments = new Map<number, Comment[]>(comments);

      const loadedCommentsPostId = loadedComments[0].postId;

      this.loadedCommentsPostIds.push(loadedCommentsPostId);

      allComments.set(loadedCommentsPostId, loadedComments);

      this.loadCommentsByPostId(0);
      this.setCommentsState(allComments);

      return allComments;
    })
  );

  constructor(private service: CommentsHttpService) {
    super(initialState);

    this.setCommentsState$.subscribe();
  }

  private setCommentsState(comments: Map<number, Comment[]>): void {
    const commentsOrderedByKey = new Map(
      [...comments.entries()].sort((a, b) => a[0] - b[0])
    );

    this.setState({ comments: commentsOrderedByKey });
  }

  loadCommentsByPostId(id: number): void {
    this._loadCommentsByPostIdAction.next(id);
  }

  getCommentsLoadedByPostId(postId: number): Observable<boolean> {
    return this.select((state) => state.comments.has(postId));
  }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.select((state) => state.comments.get(postId)).pipe(
      map((comments) => comments ?? [])
    );
  }
}
