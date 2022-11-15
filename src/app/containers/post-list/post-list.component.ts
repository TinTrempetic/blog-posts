import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostsFacade } from 'src/app/facade/posts.facade';
import { Post } from 'src/app/types';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  postsVm$ = this.facade.postsVm$;

  constructor(private facade: PostsFacade) {}

  trackById(index: number, item: Post) {
    return item.id;
  }
}
