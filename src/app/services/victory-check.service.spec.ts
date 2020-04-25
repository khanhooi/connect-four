import { TestBed } from '@angular/core/testing';

import { VictoryCheckService } from './victory-check.service';

describe('VictoryCheckService', () => {
  let service: VictoryCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VictoryCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
