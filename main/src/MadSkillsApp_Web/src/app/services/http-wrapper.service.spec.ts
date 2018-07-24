import { TestBed, inject } from '@angular/core/testing';

import { HttpWrapperService } from './http-wrapper.service';

describe('HttpWrapper.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpWrapperService]
    });
  });

  it('should be created', inject([HttpWrapperService], (service: HttpWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
