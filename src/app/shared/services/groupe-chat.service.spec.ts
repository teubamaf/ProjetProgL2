import { TestBed } from '@angular/core/testing';

import { GroupeChatService } from './groupe-chat.service';

describe('GroupeChatService', () => {
  let service: GroupeChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupeChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
