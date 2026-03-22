import { Component } from '@angular/core';
import { GUNS } from '../../data/guns.data';
import { SHIELDS } from '../../data/shields.data';
import { Gun } from '../../models/gun.model';
import { Shield } from '../../models/shield.model';
import { isNil } from 'es-toolkit/predicate';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';


interface ShotEntry {
  shotNumber: number;
  shieldDamage: number;
  hpDamage: number;
  shieldAfter: number;
  hpAfter: number;
}

@Component({
  selector: 'app-simulation',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})
export class Simulation {
  protected guns = GUNS;
  protected shields = SHIELDS;
  protected selectedGun: Gun | undefined = undefined;
  protected selectedShield: Shield | undefined = undefined;
  protected hp = 100;
  protected shieldCharge = 0;
  protected shotLog: ShotEntry[] = [];
  protected isDead = false;


  protected selectShield(selection: Shield | undefined):void{
    this.selectedShield = selection;
    this.reset();
  }

  protected isSelectedShield(selection:Shield | undefined):boolean{
    return this.selectedShield?.name === selection?.name || (!this.selectedShield && !selection);
  }

  protected reset():void{
    this.hp = 100;
    this.shieldCharge = isNil(this.selectedShield) ? 0: this.selectedShield?.totalCharge as number;
    this.shotLog = [];
    this.isDead = false;
  }

  protected fireBullet(): void {
    // TODO(human): implement bullet fire logic
    // Available state: this.selectedGun, this.selectedShield, this.hp, this.shieldCharge
    // Steps:
    //   1. Guard: return early if no gun selected or target is already dead
    //   2. Calculate shieldDamage and hpDamage based on whether shieldCharge > 0
    //      - If shield active: hpDamage = gun.damage * (1 - shield.mitigation), shieldCharge depletes by gun.damage
    //      - If no shield: hpDamage = gun.damage, shieldDamage = 0
    //   3. Update this.hp and this.shieldCharge (clamp shieldCharge to 0 minimum)
    //   4. Push a ShotEntry to this.shotLog
    //   5. Set this.isDead = true if hp <= 0

    if(isNil(this.selectedGun) || this.isDead) return;

    let hpDamage = this.selectedGun.damage;
    let shieldDamage = 0;
    if (!isNil(this.selectedShield) && this.shieldCharge > 0) {
      hpDamage = this.selectedGun.damage * (1 - this.selectedShield.mitigation);
      shieldDamage = this.selectedGun.damage
      this.shieldCharge -= shieldDamage;
    }

    this.hp -= hpDamage;

    if (this.hp <= 0) this.isDead = true;

    this.shotLog.push({shotNumber: this.shotLog.length + 1, 
      shieldDamage: shieldDamage, 
      hpDamage: hpDamage,
      shieldAfter: isNil(this.selectedShield) ? 0: this.shieldCharge, 
      hpAfter: Math.max(0,this.hp)
      } as ShotEntry)
  }
}
