import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeChatListComponent } from './groupe-chat-list.component';

describe('GroupeChatListComponent', () => {
  let component: GroupeChatListComponent;
  let fixture: ComponentFixture<GroupeChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeChatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
