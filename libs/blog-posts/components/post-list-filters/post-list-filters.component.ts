import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostFilters } from 'libs/blog-posts/types';
import { DropdownOptions } from 'libs/shared/types';
import { User } from 'libs/users/types';

@Component({
  selector: 'post-list-filters',
  templateUrl: './post-list-filters.component.html',
  styleUrls: ['./post-list-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListFiltersComponent {
  dropdownOptions: DropdownOptions[] = [];

  filterForm = this.fb.group({
    userId: ['', []],
    searchText: ['', []],
  });

  get dropdownLabel(): string {
    const selectedUserId = this.filterForm.value.userId;

    if (!selectedUserId) return 'Select User';

    const userName = this.dropdownOptions.find(
      (x) => x.value.toString() === selectedUserId?.toString()
    )?.label;

    return userName ?? 'Select user';
  }

  @Input() set users(input: User[]) {
    this.dropdownOptions = input.map((user) => {
      return {
        value: user.id,
        label: user.name,
      };
    });

    this.dropdownOptions.unshift({ value: '', label: 'Reset' });
  }

  @Output() filter = new EventEmitter<PostFilters>();

  constructor(private fb: FormBuilder) {}

  filterPosts(): void {
    this.filter.emit(this.filterForm.value as unknown as PostFilters);
  }
}
