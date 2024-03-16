import { TestBed } from '@angular/core/testing';

import { PropertyRentsService } from './property-rents.service';

describe('PropertyRentsService', () => {
  let service: PropertyRentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyRentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
