import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from 'libs/comments/types';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment: Comment;
}
