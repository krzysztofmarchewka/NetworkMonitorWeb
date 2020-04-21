import { TestBed } from '@angular/core/testing';

import { ReverseDnsService } from './reverse-dns.service';

describe('ReverseDnsService', () => {
  let service: ReverseDnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseDnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
