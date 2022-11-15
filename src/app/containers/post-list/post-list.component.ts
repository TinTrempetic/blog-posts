import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FakeServerHttpService } from 'src/app/services/fake-server.http-service';
import { Post } from 'src/app/types';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  posts$ = this.fakeServerService.getAllPosts();

  constructor(private fakeServerService: FakeServerHttpService) {}

  ngOnInit(): void {}

  trackById(index: number, item: Post) {
    return item.id;
  }
}
