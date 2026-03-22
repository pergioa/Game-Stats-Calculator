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
      shieldAfter: this.shieldCharge, 
      hpAfter: Math.max(0,this.hp)
      } as ShotEntry)
  }
}
