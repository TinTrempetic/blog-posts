import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'post-list-filters',
  templateUrl: './post-list-filters.component.html',
  styleUrls: ['./post-list-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListFiltersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
