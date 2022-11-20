import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogPostStateService } from 'libs/blog-posts/services/blog-posts-state.service';
import { Post } from 'libs/blog-posts/types';
import { SubscribableBase } from 'libs/shared/subscribable-base';
import { UserStateService } from 'libs/users/service/user-state.service';
import { filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent extends SubscribableBase implements OnInit {
  posts$ = this.blogPostState.posts$;

  users$ = this.userState.users$;

  constructor(
    private blogPostState: BlogPostStateService,
    private userState: UserStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.blogPostState.allPostsLoaded$
      .pipe(
        filter((loaded) => !loaded),
        tap(() => this.blogPostState.loadAllPosts()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  trackById(index: number, item: Post) {
    return item.id;
  }
}
