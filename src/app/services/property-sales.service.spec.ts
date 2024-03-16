import { TestBed } from '@angular/core/testing';

import { PropertySalesService } from './property-sales.service';

describe('PropertySalesService', () => {
  let service: PropertySalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertySalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
