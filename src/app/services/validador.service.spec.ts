import { TestBed } from '@angular/core/testing';

import { ValidadorService } from './validador.service';

describe('ValidatorsService', () => {
  let service: ValidadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
