import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogPostStateService, Post, PostFilters } from 'projects/posts';
import { SubscribableBase } from 'projects/shared';
import { UserStateService } from 'projects/users';
import { filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent extends SubscribableBase implements OnInit {
  posts$ = this.blogPostState.filteredPosts$;
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

  filterHandler(filters: PostFilters): void {
    this.blogPostState.filterPosts(filters);
  }
}
