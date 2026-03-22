import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldSelector } from './shield-selector';

describe('ShieldSelector', () => {
  let component: ShieldSelector;
  let fixture: ComponentFixture<ShieldSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShieldSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShieldSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
