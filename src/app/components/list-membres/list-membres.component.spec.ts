import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMembresComponent } from './list-membres.component';

describe('ListMembresComponent', () => {
  let component: ListMembresComponent;
  let fixture: ComponentFixture<ListMembresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMembresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
