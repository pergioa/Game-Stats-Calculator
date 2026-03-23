import { TestBed } from '@angular/core/testing';

import { ShieldService } from './shield-service';

describe('ShieldService', () => {
  let service: ShieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
