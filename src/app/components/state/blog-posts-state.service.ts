import { Injectable } from '@angular/core';
import { Subject, switchMap, tap } from 'rxjs';
import { FakeServerHttpService } from '../../services/fake-server.http-service';
import { StateService } from '../../shared/state.service';
import { Post } from '../../types';

interface BlogPostState {
  loaded: boolean;
  posts: Post[];
}

const initialState: BlogPostState = {
  loaded: false,
  posts: [],
};

@Injectable()
export class BlogPostStateService extends StateService<BlogPostState> {
  loaded$ = this.select((state) => state.loaded);
  posts$ = this.select((state) => state.posts);

  private _loadAllPostsAction = new Subject<void>();
  private loadAllPostsAction$ = this._loadAllPostsAction.asObservable().pipe(
    switchMap(() => this.service.getAllPosts()),
    tap((posts) => {
      this.setPostsState(posts);
      this.setLoadedState(true);
    })
  );

  constructor(private service: FakeServerHttpService) {
    super(initialState);

    this.loadAllPostsAction$.subscribe();
  }

  loadAllPosts(): void {
    this._loadAllPostsAction.next();
  }

  private setPostsState(posts: Post[]): void {
    this.setState({ posts });
  }

  private setLoadedState(loaded: boolean): void {
    this.setState({ loaded });
  }
}
