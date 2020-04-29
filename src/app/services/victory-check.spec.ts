import { TestBed } from '@angular/core/testing';

import { VictoryCheck } from './victory-check';

describe('VictoryCheckService', () => {
  let service: VictoryCheck;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VictoryCheck);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
