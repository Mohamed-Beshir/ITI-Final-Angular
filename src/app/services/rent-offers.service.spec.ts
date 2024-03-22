import { TestBed } from '@angular/core/testing';

import { RentOffersService } from './rent-offers.service';

describe('RentOffersService', () => {
  let service: RentOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
