import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, takeUntil, tap } from 'rxjs';
import { BlogPostStateService } from 'src/app/components/state/blog-posts-state.service';
import { SubscribableBase } from 'src/app/shared/subscribable-base';
import { Post } from 'src/app/types';

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
