import { Component, output } from '@angular/core';
import { SHIELDS } from '../../data/shields.data';
import { Shield } from '../../models/shield.model';

@Component({
  selector: 'app-shield-selector',
  imports: [],
  templateUrl: './shield-selector.html',
  styleUrl: './shield-selector.scss',
})
export class ShieldSelector {
  protected shields = SHIELDS;
  protected shield: Shield | undefined = undefined;
  protected shieldChange = output<Shield | undefined>();

  protected selectShield(selection: Shield | undefined) {
    this.shield = selection;
    this.shieldChange.emit(selection);
  }

  public isSelectedShield(selection: Shield | undefined): boolean {
    return this.shield?.name === selection?.name || (!this.shield && !selection);
  }

  public get selectedShieldLabel(): string {
    return this.shield?.name ?? 'No shield';
  }
}
