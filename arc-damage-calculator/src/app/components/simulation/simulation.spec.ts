import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Simulation } from './simulation';

describe('Simulation', () => {
  let component: Simulation;
  let fixture: ComponentFixture<Simulation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Simulation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Simulation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
