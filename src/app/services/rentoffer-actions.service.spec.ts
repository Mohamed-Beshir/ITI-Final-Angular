import { TestBed } from '@angular/core/testing';

import { RentofferActionsService } from './rentoffer-actions.service';

describe('RentofferActionsService', () => {
  let service: RentofferActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentofferActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
