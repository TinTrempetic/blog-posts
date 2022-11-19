import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostStateService } from 'libs/blog-posts/services/blog-posts-state.service';
import { SubscribableBase } from 'libs/shared/subscribable-base';
import { filter, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent extends SubscribableBase implements OnInit {
  post$ = this.state.selectedPost$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private state: BlogPostStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['postId']),
        filter((id) => !!id),
        tap((id: number) => this.state.loadPostById(id)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
