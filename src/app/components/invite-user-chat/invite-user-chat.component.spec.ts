import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUserChatComponent } from './invite-user-chat.component';

describe('InviteUserChatComponent', () => {
  let component: InviteUserChatComponent;
  let fixture: ComponentFixture<InviteUserChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteUserChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteUserChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
