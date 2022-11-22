import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from 'projects/comments';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment: Comment;
}
