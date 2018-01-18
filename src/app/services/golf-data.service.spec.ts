import { TestBed, inject } from '@angular/core/testing';

import { GolfDataService } from './golf-data.service';

describe('GolfDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GolfDataService]
    });
  });

  it('should be created', inject([GolfDataService], (service: GolfDataService) => {
    expect(service).toBeTruthy();
  }));
});
