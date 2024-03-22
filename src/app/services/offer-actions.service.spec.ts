import { TestBed } from '@angular/core/testing';

import { OfferActionsService } from './offer-actions.service';

describe('OfferActionsService', () => {
  let service: OfferActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
