import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitterGroupeComponent } from './quitter-groupe.component';

describe('QuitterGroupeComponent', () => {
  let component: QuitterGroupeComponent;
  let fixture: ComponentFixture<QuitterGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitterGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitterGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
