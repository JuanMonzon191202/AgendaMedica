import { TestBed } from '@angular/core/testing';

import { EspecialidadesServiceService } from './especialidades-service.service';

describe('EspecialidadesServiceService', () => {
  let service: EspecialidadesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialidadesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
