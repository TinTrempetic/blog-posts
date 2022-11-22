import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from 'projects/posts';

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListItemComponent {
  @Input() post: Post;
  @Input() authorName: string;
}
