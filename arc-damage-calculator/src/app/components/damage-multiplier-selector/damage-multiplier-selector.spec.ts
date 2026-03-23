import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageMultiplierSelector } from './damage-multiplier-selector';

describe('DamageMultiplierSelector', () => {
  let component: DamageMultiplierSelector;
  let fixture: ComponentFixture<DamageMultiplierSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamageMultiplierSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageMultiplierSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to body selection', () => {
    expect((component as any).selectedBodyPartLabel).toBe('body');
    expect((component as any).isSelectedBodyPart('body')).toBe(true);
  });
});
