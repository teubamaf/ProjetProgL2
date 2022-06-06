import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejoindreGroupeComponent } from './rejoindre-groupe.component';

describe('RejoindreGroupeComponent', () => {
  let component: RejoindreGroupeComponent;
  let fixture: ComponentFixture<RejoindreGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejoindreGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejoindreGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
