import { Injectable } from '@angular/core';
import { Grenade } from '../models/grenade.model';
import { Shield } from '../models/shield.model';
import { isNil } from 'es-toolkit/predicate';
import { NoShieldCalculator } from './strategies/no-shield-calculator';
import { ShieldedCalculator } from './strategies/shielded-calculator';

@Injectable({
  providedIn: 'root',
})
export class GrenadeDamageCalc {
  public hitsToKill(grenade: Grenade, shield?:Shield): number{
    const strategy  = isNil(shield) ? new NoShieldCalculator() : new ShieldedCalculator(shield as Shield);

    return strategy.calculate(grenade, 1);
  }
}
