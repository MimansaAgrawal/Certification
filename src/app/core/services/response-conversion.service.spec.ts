import { TestBed } from '@angular/core/testing';

import { ResponseConversionService } from './response-conversion.service';

describe('ResponseConversionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponseConversionService = TestBed.get(ResponseConversionService);
    expect(service).toBeTruthy();
  });
});
