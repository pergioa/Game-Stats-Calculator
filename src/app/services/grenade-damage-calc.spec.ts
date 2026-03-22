import { TestBed } from '@angular/core/testing';

import { GrenadeDamageCalc } from './grenade-damage-calc';

describe('GrenadeDamageCalc', () => {
  let service: GrenadeDamageCalc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrenadeDamageCalc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
