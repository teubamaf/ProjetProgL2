import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsGroupeComponent } from './chats-groupe.component';

describe('ChatsGroupeComponent', () => {
  let component: ChatsGroupeComponent;
  let fixture: ComponentFixture<ChatsGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
