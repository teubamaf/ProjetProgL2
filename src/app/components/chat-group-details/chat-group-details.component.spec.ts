import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGroupDetailsComponent } from './chat-group-details.component';

describe('ChatGroupDetailsComponent', () => {
  let component: ChatGroupDetailsComponent;
  let fixture: ComponentFixture<ChatGroupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatGroupDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
