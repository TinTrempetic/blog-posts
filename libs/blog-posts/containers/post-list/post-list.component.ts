import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogPostStateService } from 'libs/blog-posts/services/blog-posts-state.service';
import { Post } from 'libs/blog-posts/types';
import { SubscribableBase } from 'libs/shared/subscribable-base';
import { filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent extends SubscribableBase implements OnInit {
  posts$ = this.state.posts$;

  constructor(private state: BlogPostStateService) {
    super();
  }

  ngOnInit(): void {
    this.state.allPostsLoaded$
      .pipe(
        filter((loaded) => !loaded),
        tap(() => this.state.loadAllPosts()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  trackById(index: number, item: Post) {
    return item.id;
  }
}
