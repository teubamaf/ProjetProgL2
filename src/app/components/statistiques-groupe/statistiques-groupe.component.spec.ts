import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesGroupeComponent } from './statistiques-groupe.component';

describe('StatistiquesGroupeComponent', () => {
  let component: StatistiquesGroupeComponent;
  let fixture: ComponentFixture<StatistiquesGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquesGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquesGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
