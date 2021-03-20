import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGroupeDetailsComponent } from './join-groupe-details.component';

describe('JoinGroupeDetailsComponent', () => {
  let component: JoinGroupeDetailsComponent;
  let fixture: ComponentFixture<JoinGroupeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinGroupeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGroupeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
