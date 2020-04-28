import { TestBed } from '@angular/core/testing';

import { PlayerAiService } from './player-ai.service';

describe('PlayerAiService', () => {
  let service: PlayerAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
