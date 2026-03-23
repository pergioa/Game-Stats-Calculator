import { Component, inject, output } from '@angular/core';
import { Shield } from '../../models/shield.model';
import { ShieldService } from '../../services/shield-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-shield-selector',
  imports: [AsyncPipe],
  templateUrl: './shield-selector.html',
  styleUrl: './shield-selector.scss',
})
export class ShieldSelector {
  private shieldService = inject(ShieldService);
  protected shields$ = this.shieldService.getShields();
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
