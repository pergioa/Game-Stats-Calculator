import { Component, inject } from '@angular/core';
import { Gun } from '../../models/gun.model';
import { Shield } from '../../models/shield.model';
import { GunService } from '../../services/gun-service';
import { isNil } from 'es-toolkit/predicate';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ShieldSelector } from '../shield-selector/shield-selector';
import {
  BodyPart,
  DamageMultiplierSelector,
} from '../damage-multiplier-selector/damage-multiplier-selector';

interface ShotEntry {
  shotNumber: number;
  shieldDamage: number;
  hpDamage: number;
  damageMultiplier:number;
  shieldAfter: number;
  hpAfter: number;
}

@Component({
  selector: 'app-simulation',
  imports: [FormsModule, DecimalPipe, AsyncPipe, ShieldSelector, DamageMultiplierSelector],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})
export class Simulation {
  private gunService = inject(GunService);
  protected guns$ = this.gunService.getGuns();
  protected selectedGun: Gun | undefined = undefined;
  protected selectedShield: Shield | undefined = undefined;
  protected bodyPart: BodyPart = 'body';
  protected hp = 100;
  protected shieldCharge = 0;
  protected shotLog: ShotEntry[] = [];
  protected isDead = false;

  protected selectShield(selection: Shield | undefined): void {
    this.selectedShield = selection;
    this.reset();
  }

  protected selectBodyPart(selection: BodyPart): void {
    this.bodyPart = selection;
    this.reset();
  }

  protected reset(): void {
    this.hp = 100;
    this.shieldCharge = isNil(this.selectedShield) ? 0 : (this.selectedShield?.totalCharge as number);
    this.shotLog = [];
    this.isDead = false;
  }

  protected fireBullet(): void {
    if (isNil(this.selectedGun) || this.isDead) return;

    const baseDamage = this.selectedGun.damage;
    const damageMultiplier = this.getDamageMultiplier(this.selectedGun);
    let hpDamage = baseDamage * damageMultiplier;
    let shieldDamage = 0;

    if (!isNil(this.selectedShield) && this.shieldCharge > 0) {
      hpDamage = baseDamage * (1 - this.selectedShield.mitigation) * damageMultiplier;
      shieldDamage = baseDamage;
      this.shieldCharge = this.shieldCharge - shieldDamage < 0 ? 0 : this.shieldCharge - shieldDamage;
    }

    this.hp -= hpDamage;

    if (this.hp <= 0) this.isDead = true;

    this.shotLog.push({
      shotNumber: this.shotLog.length + 1,
      shieldDamage: shieldDamage,
      hpDamage: hpDamage,
      damageMultiplier: damageMultiplier,
      shieldAfter: Math.max(0, this.shieldCharge),
      hpAfter: Math.max(0, this.hp),
    } as ShotEntry);
  }

  private getDamageMultiplier(gun: Gun): number {
    switch (this.bodyPart) {
      case 'head':
        return gun.headshotMultiplier;
      case 'leg':
        return gun.limbMultiplier;
      default:
        return 1;
    }
  }
}
