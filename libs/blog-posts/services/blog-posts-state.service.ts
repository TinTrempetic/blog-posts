import { Injectable } from '@angular/core';
import { FakeServerHttpService } from 'libs/shared/fake-server.http-service';
import { StateService } from 'libs/shared/state.service';
import { distinctUntilChanged, filter, Subject, switchMap, tap } from 'rxjs';
import { Post } from '../types';

interface BlogPostState {
  loaded: boolean;
  posts: Post[];
  selectedPostLoaded: boolean;
  selectedPost?: Post;
}

const initialState: BlogPostState = {
  loaded: false,
  posts: [],
  selectedPostLoaded: false,
};

@Injectable()
export class BlogPostStateService extends StateService<BlogPostState> {
  allPostsLoaded$ = this.select((state) => state.loaded);
  posts$ = this.select((state) => state.posts);
  selectedPostLoaded$ = this.select((state) => state.selectedPostLoaded);
  selectedPost$ = this.select((state) => state.selectedPost);

  private _loadAllPostsAction = new Subject<void>();
  loadAllPostsAction$ = this._loadAllPostsAction.asObservable().pipe(
    tap(() => this.setAllPostsLoadedState(false)),
    switchMap(() => this.service.getAllPosts()),
    tap((posts) => {
      this.setPostsState(posts);
      this.setAllPostsLoadedState(true);
    })
  );

  private _loadPostByIdAction = new Subject<number>();
  loadPostByIdAction$ = this._loadPostByIdAction.asObservable().pipe(
    distinctUntilChanged(),
    tap(() => this.resetSelectedPostState()),
    filter((id) => !!id),
    switchMap((id) => this.service.getPostById(id)),
    tap((post) => {
      this.setSelectedPostState(post);
      this.setSelectedPostLoadedState(true);
    })
  );

  constructor(private service: FakeServerHttpService) {
    super(initialState);

    this.loadAllPostsAction$.subscribe();
    this.loadPostByIdAction$.subscribe();
  }

  loadAllPosts(): void {
    this._loadAllPostsAction.next();
  }

  loadPostById(id: number): void {
    this._loadPostByIdAction.next(id);
  }

  private resetSelectedPostState(): void {
    this.setSelectedPostLoadedState(false);
    this.setSelectedPostState(undefined);
  }

  private setPostsState(posts: Post[]): void {
    this.setState({ posts });
  }

  private setAllPostsLoadedState(loaded: boolean): void {
    this.setState({ loaded });
  }

  private setSelectedPostState(selectedPost: Post | undefined): void {
    this.setState({ selectedPost });
  }

  private setSelectedPostLoadedState(selectedPostLoaded: boolean): void {
    this.setState({ selectedPostLoaded });
  }
}
