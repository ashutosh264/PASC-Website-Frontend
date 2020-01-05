import { TestBed } from '@angular/core/testing';

import { UpcomingService } from './upcoming.service';

describe('UpcomingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpcomingService = TestBed.get(UpcomingService);
    expect(service).toBeTruthy();
  });
});
