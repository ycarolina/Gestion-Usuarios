import { TestBed } from '@angular/core/testing';

import { Csv2fireService } from './csv2fire.service';

describe('Csv2fireService', () => {
  let service: Csv2fireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Csv2fireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
