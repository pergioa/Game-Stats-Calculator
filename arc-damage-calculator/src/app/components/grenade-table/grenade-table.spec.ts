import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrenadeTable } from './grenade-table';

describe('GrenadeTable', () => {
  let component: GrenadeTable;
  let fixture: ComponentFixture<GrenadeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrenadeTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrenadeTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
