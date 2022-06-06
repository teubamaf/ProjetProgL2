import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheGroupeComponent } from './recherche-groupe.component';

describe('RechercheGroupeComponent', () => {
  let component: RechercheGroupeComponent;
  let fixture: ComponentFixture<RechercheGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
