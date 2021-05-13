import { TestBed } from '@angular/core/testing';

import { MembreGroupeChatService } from './membre-groupe-chat.service';

describe('MembreGroupeChatService', () => {
  let service: MembreGroupeChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembreGroupeChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
