import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil, tap } from 'rxjs';
import { BlogPostStateService } from 'src/app/components/state/blog-posts-state.service';
import { SubscribableBase } from 'src/app/shared/subscribable-base';

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
