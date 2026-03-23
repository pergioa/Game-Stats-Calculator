import { Injectable } from '@angular/core';
import { Shield } from '../models/shield.model';
import { Gun } from '../models/gun.model';
import { isNil } from 'es-toolkit/predicate';
import { NoShieldCalculator } from './strategies/no-shield-calculator';
import { ShieldedCalculator } from './strategies/shielded-calculator';

@Injectable({
  providedIn: 'root',
})
export class DamageCalc {
  

  public hitsToKill(gun: Gun, multiplier: number,shield?:Shield ): number{
    const strategy  = isNil(shield) ? new NoShieldCalculator() : new ShieldedCalculator(shield as Shield);

    return strategy.calculate(gun, multiplier);
  }
}


