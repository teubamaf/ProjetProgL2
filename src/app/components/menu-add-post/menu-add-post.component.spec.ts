import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddPostComponent } from './menu-add-post.component';

describe('MenuAddPostComponent', () => {
  let component: MenuAddPostComponent;
  let fixture: ComponentFixture<MenuAddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAddPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
