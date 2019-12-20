import { TestBed } from '@angular/core/testing';

import { CrmapiService } from './crmapi.service';

describe('CrmapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrmapiService = TestBed.get(CrmapiService);
    expect(service).toBeTruthy();
  });
});
