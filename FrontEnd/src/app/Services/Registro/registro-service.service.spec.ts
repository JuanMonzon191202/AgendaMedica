import { TestBed } from '@angular/core/testing';

import { RegistroServiceService } from './registro-service.service';

describe('RegistroServiceService', () => {
  let service: RegistroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
