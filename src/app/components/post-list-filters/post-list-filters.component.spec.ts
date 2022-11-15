import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListFiltersComponent } from './post-list-filters.component';

describe('PostListFiltersComponent', () => {
  let component: PostListFiltersComponent;
  let fixture: ComponentFixture<PostListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
