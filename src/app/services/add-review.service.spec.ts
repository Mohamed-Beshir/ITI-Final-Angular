import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AddReviewService } from './add-review.service';

describe('AddReviewService', () => {
  let service: AddReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddReviewService]
    });
    service = TestBed.inject(AddReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add additional test cases here to cover different functionalities of AddReviewService
});
