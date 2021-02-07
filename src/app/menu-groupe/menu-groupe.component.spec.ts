import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGroupeComponent } from './menu-groupe.component';

describe('MenuGroupeComponent', () => {
  let component: MenuGroupeComponent;
  let fixture: ComponentFixture<MenuGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
