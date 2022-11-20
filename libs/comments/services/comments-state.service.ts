import { Injectable } from '@angular/core';
import { FakeServerHttpService } from 'libs/shared/fake-server.http-service';
import { StateService } from 'libs/shared/state.service';
import { combineLatest, map, Observable, of, Subject, switchMap } from 'rxjs';
import { Comment } from '../types';

interface CommentsState {
  loading: Map<number, boolean>;
  comments: Map<number, Comment[]>;
}

const initialState: CommentsState = {
  loading: new Map<number, boolean>(),
  comments: new Map<number, Comment[]>(),
};

@Injectable()
export class CommentsStateService extends StateService<CommentsState> {
  loading$ = this.select((state) => state.loading);

  private allComments$ = this.select((state) => state.comments);

  private _loadCommentsByPostIdAction = new Subject<number>();
  private loadCommentsByPostIdAction$ =
    this._loadCommentsByPostIdAction.asObservable();

  private loadedCommentsByPostId$ = combineLatest([
    this.allComments$,
    this.loadCommentsByPostIdAction$,
  ]).pipe(
    map(([comments, postId]) => {
      return {
        comments,
        postId,
      };
    }),
    switchMap(({ comments, postId }) => {
      if (postId === 0 || comments.get(postId)) return of([]);

      return this.service.getCommentsByPostId(postId);
    })
  );

  private setCommentsState$ = combineLatest([
    this.allComments$,
    this.loadedCommentsByPostId$,
  ]).pipe(
    map(([comments, loadedComments]) => {
      return {
        comments,
        loadedComments,
      };
    }),
    switchMap(({ comments, loadedComments }) => {
      const allComments = new Map<number, Comment[]>(comments);

      if (!loadedComments.length) return allComments;

      const loadedCommentsPostId = loadedComments[0].postId;

      allComments.set(loadedCommentsPostId, loadedComments);

      this.loadCommentsByPostId(0);
      this.setCommentsState(allComments);

      return allComments;
    })
  );

  constructor(private service: FakeServerHttpService) {
    super(initialState);

    this.setCommentsState$.subscribe();
  }

  private setCommentsState(comments: Map<number, Comment[]>): void {
    this.setState({ comments });
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
