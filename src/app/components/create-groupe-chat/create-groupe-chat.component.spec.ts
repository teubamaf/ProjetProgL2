import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupeChatComponent } from './create-groupe-chat.component';

describe('CreateGroupeChatComponent', () => {
  let component: CreateGroupeChatComponent;
  let fixture: ComponentFixture<CreateGroupeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupeChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
