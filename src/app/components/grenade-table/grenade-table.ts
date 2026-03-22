import { Component, inject } from '@angular/core';
import { Shield } from '../../models/shield.model';
import { Grenade } from '../../models/grenade.model';
import { GRENADES } from '../../data/grenades.data';
import { GrenadeDamageCalc } from '../../services/grenade-damage-calc';
import { ShieldSelector } from '../shield-selector/shield-selector';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grenade-table',
  imports: [ShieldSelector,FormsModule, MultiSelect],
  templateUrl: './grenade-table.html',
  styleUrl: './grenade-table.scss',
})
export class GrenadeTable {
  private damageCalc = inject(GrenadeDamageCalc);
  protected grenades = GRENADES;

  protected selectedGrenades: Grenade[] = [];
  protected shield: Shield | undefined = undefined;

  protected get selectedShieldLabel(): string {
    return this.shield?.name ?? 'No shield';
  }

  protected get selectionCount(): number {
    return this.selectedGrenades.length;
  }

  protected get selectionSummary(): string {
    if (this.selectionCount === 0) {
      return 'Select grenades';
    }

    if (this.selectionCount === this.grenades.length) {
      return 'All grenades selected';
    }

    return `${this.selectionCount} grenades selected`;
  }

  protected getHitsToKill(grenade: Grenade) {
    return this.damageCalc.hitsToKill(grenade, this.shield);
  }

  protected selectShield(selection: Shield | undefined) {
    this.shield = selection;
  }
}
