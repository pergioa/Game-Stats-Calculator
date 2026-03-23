import { TestBed } from '@angular/core/testing';

import { DamageCalc } from './damage-calc';

describe('DamageCalc', () => {
  let service: DamageCalc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamageCalc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
