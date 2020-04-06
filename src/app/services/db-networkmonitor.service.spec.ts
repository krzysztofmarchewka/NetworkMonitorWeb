import { TestBed } from '@angular/core/testing';

import { DbNetworkmonitorService } from './db-networkmonitor.service';

describe('DbNetworkmonitorService', () => {
  let service: DbNetworkmonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbNetworkmonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
