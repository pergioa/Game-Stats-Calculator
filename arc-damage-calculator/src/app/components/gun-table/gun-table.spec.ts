import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GunTable } from './gun-table';

describe('GunTable', () => {
  let component: GunTable;
  let fixture: ComponentFixture<GunTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GunTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GunTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
