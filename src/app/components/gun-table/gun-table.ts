import { Component, inject } from '@angular/core';
import { DamageCalc } from '../../services/damage-calc';
import { GUNS } from '../../data/guns.data';
import { Gun } from '../../models/gun.model';
import { Shield } from '../../models/shield.model';
import { SHIELDS } from '../../data/shields.data';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gun-table',
  imports: [MultiSelect, FormsModule],
  templateUrl: './gun-table.html',
  styleUrl: './gun-table.scss',
})
export class GunTable {
  private damageCalc = inject(DamageCalc);
  protected shields = SHIELDS;
  protected guns = GUNS;

  protected selectedGuns: Gun[] = [];
  protected shield: Shield | undefined = undefined;

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

  protected selectShield(selection: Shield | undefined) {
    this.shield = selection;
  }

  protected isSelectedShield(selection: Shield | undefined): boolean {
    return this.shield?.name === selection?.name || (!this.shield && !selection);
  }

  protected formatFireRate(fireRate: number): string {
    return `${fireRate.toFixed(1)}/min`;
  }
}
