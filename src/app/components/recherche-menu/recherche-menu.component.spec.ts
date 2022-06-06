import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheMenuComponent } from './recherche-menu.component';

describe('RechercheMenuComponent', () => {
  let component: RechercheMenuComponent;
  let fixture: ComponentFixture<RechercheMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
