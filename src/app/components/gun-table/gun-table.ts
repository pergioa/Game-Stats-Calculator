import { Component, inject } from '@angular/core';
import { DamageCalc } from '../../services/damage-calc';
import { GUNS } from '../../data/guns.data';
import { Gun } from '../../models/gun.model';
import { Shield } from '../../models/shield.model';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ShieldSelector } from '../shield-selector/shield-selector';

@Component({
  selector: 'app-gun-table',
  imports: [MultiSelect, FormsModule,ShieldSelector],
  templateUrl: './gun-table.html',
  styleUrl: './gun-table.scss',
})
export class GunTable {
  private damageCalc = inject(DamageCalc);
  protected guns = GUNS;
  protected shield: Shield | undefined;

  protected selectedGuns: Gun[] = [];

  protected get selectedShieldLabel(): string {
    return this.shield?.name ?? 'No shield';
  }

  protected get selectionCount(): number {
    return this.selectedGuns.length;
  }

  protected get selectionSummary(): string {
    if (this.selectionCount === 0) {
      return 'Select weapons';
    }

    if (this.selectionCount === this.guns.length) {
      return 'All weapons selected';
    }

    return `${this.selectionCount} weapons selected`;
  }

    protected selectShield(selection: Shield | undefined) {
    this.shield = selection;
  }

  protected get sortedSelectedGuns(): Gun[] {
    return [...this.selectedGuns].sort((left, right) => {
      const hitDifference = this.getHitsToKill(left) - this.getHitsToKill(right);

      if (hitDifference !== 0) {
        return hitDifference;
      }

      return right.relativeDps - left.relativeDps;
    });
  }

  protected getHitsToKill(gun: Gun) {
    return this.damageCalc.hitsToKill(gun, this.shield);
  }

  protected formatFireRate(fireRate: number): string {
    return `${fireRate.toFixed(1)}/min`;
  }
}
