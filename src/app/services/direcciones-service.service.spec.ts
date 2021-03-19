import { TestBed } from '@angular/core/testing';

import { DireccionesServiceService } from './direcciones-service.service';

describe('DireccionesServiceService', () => {
  let service: DireccionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
