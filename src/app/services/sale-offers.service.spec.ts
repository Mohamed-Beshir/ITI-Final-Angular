import { TestBed } from '@angular/core/testing';

import { SaleOffersService } from './sale-offers.service';

describe('SaleOffersService', () => {
  let service: SaleOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
