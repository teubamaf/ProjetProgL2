import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGroupesPostComponent } from './all-groupes-post.component';

describe('AllGroupesPostComponent', () => {
  let component: AllGroupesPostComponent;
  let fixture: ComponentFixture<AllGroupesPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGroupesPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGroupesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
