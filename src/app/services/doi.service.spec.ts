import { TestBed, inject } from '@angular/core/testing';

import { DoiService } from './doi.service';

describe('DoiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoiService]
    });
  });

  it('should be created', inject([DoiService], (service: DoiService) => {
    expect(service).toBeTruthy();
  }));
});
