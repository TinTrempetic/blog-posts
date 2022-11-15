import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { FakeServerHttpService } from '../services/fake-server.http-service';
import { Post } from '../types';

@Injectable()
export class PostsFacade {
  constructor(private service: FakeServerHttpService) {}

  private _postsLoaded = new BehaviorSubject<boolean>(false);
  private _postsLoaded$ = this._postsLoaded.asObservable().pipe(
    filter((loaded) => !loaded),
    switchMap(() => this.service.getAllPosts()),
    tap((posts) => this._allPosts.next(posts)),
    switchMap(() => of(true))
  );

  private _allPosts = new Subject<Post[]>();
  private _allPosts$ = this._allPosts.asObservable();

  postsVm$ = combineLatest([this._postsLoaded$, this._allPosts$]).pipe(
    map(([postsLoaded, allPosts]) => {
      return { postsLoaded, allPosts };
    })
  );
}
