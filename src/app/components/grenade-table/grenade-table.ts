import { Component, inject } from '@angular/core';
import { Shield } from '../../models/shield.model';
import { Grenade } from '../../models/grenade.model';
import { GrenadeDamageCalc } from '../../services/grenade-damage-calc';
import { ShieldSelector } from '../shield-selector/shield-selector';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { GrenadeService } from '../../services/grenade-service';

@Component({
  selector: 'app-grenade-table',
  imports: [ShieldSelector,FormsModule, MultiSelect, AsyncPipe],
  templateUrl: './grenade-table.html',
  styleUrl: './grenade-table.scss',
})
export class GrenadeTable {
  private damageCalc = inject(GrenadeDamageCalc);
  private grandeService = inject(GrenadeService);
  protected grenades$ = this.grandeService.getGrenades();

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

    if (this.selectionCount === 0) {
      return 'All grenades selected';
    }

    return `${this.selectionCount} grenades selected`;
  }

  protected getHitsToKill(grenade: Grenade) {
    return this.damageCalc.hitsToKill(grenade, this.shield);
  }

  protected clearSelectedGrenades(): void {
    this.selectedGrenades = [];
  }

  protected selectShield(selection: Shield | undefined) {
    this.shield = selection;
  }
}
