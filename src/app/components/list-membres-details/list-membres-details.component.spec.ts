import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMembresDetailsComponent } from './list-membres-details.component';

describe('ListMembresDetailsComponent', () => {
  let component: ListMembresDetailsComponent;
  let fixture: ComponentFixture<ListMembresDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMembresDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMembresDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
