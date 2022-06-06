import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecherchePostComponent } from './recherche-post.component';

describe('RecherchePostComponent', () => {
  let component: RecherchePostComponent;
  let fixture: ComponentFixture<RecherchePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecherchePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecherchePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
