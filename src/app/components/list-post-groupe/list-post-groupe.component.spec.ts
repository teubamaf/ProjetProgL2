import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostGroupeComponent } from './list-post-groupe.component';

describe('ListPostGroupeComponent', () => {
  let component: ListPostGroupeComponent;
  let fixture: ComponentFixture<ListPostGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPostGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
