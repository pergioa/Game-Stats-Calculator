import { Component, inject } from '@angular/core';
import { DamageCalc } from '../../services/damage-calc';
import { GunService } from "../../services/gun-service";
import { AsyncPipe } from "@angular/common";
import { Gun } from '../../models/gun.model';
import { Shield } from '../../models/shield.model';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ShieldSelector } from '../shield-selector/shield-selector';
import { BodyPart, DamageMultiplierSelector } from "../damage-multiplier-selector/damage-multiplier-selector";

@Component({
  selector: 'app-gun-table',
  imports: [MultiSelect, FormsModule, ShieldSelector, DamageMultiplierSelector, AsyncPipe],
  templateUrl: './gun-table.html',
  styleUrl: './gun-table.scss',
})
export class GunTable {
  private damageCalc = inject(DamageCalc);
  private gunService = inject(GunService)
  protected guns$ = this.gunService.getGuns();
  protected shield: Shield | undefined;
  protected bodyPart: BodyPart  = 'body';
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

    if (this.selectionCount === 0) {
      return 'All weapons selected';
    }

    return `${this.selectionCount} weapons selected`;
  }

  protected selectShield(selection: Shield | undefined) {
    this.shield = selection;
  }

  protected selectBodyPart(selection: string | undefined){
    this.bodyPart = selection as BodyPart;
  }

  protected clearSelectedGuns(): void {
    this.selectedGuns = [];
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
    let damageMultiplier = 1;

    switch (this.bodyPart) {
      case 'head':
        damageMultiplier = gun.headshotMultiplier
        break;
      
      case 'leg':
        damageMultiplier = gun.limbMultiplier
        break;
    
      default:
        damageMultiplier = 1
        break;
    }

    return this.damageCalc.hitsToKill(gun, damageMultiplier ,this.shield);
  }

  protected formatFireRate(fireRate: number): string {
    return `${fireRate.toFixed(1)}/min`;
  }
}
