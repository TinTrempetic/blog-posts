import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostStateService } from 'libs/blog-posts/services/blog-posts-state.service';
import { SubscribableBase } from 'libs/shared/core/subscribable-base';
import { UserStateService } from 'libs/users/service/user-state.service';
import { filter, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent extends SubscribableBase implements OnInit {
  post$ = this.blogPostState.selectedPost$;
  users$ = this.userState.users$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userState: UserStateService,
    private blogPostState: BlogPostStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['postId']),
        filter((id) => !!id),
        tap((id: number) => this.blogPostState.loadPostById(id)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
