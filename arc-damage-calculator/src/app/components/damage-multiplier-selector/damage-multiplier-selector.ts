import { Component, output } from '@angular/core';

export type BodyPart = 'body' | 'head' | 'leg';

@Component({
  selector: 'app-damage-multiplier-selector',
  imports: [],
  templateUrl: './damage-multiplier-selector.html',
  styleUrl: './damage-multiplier-selector.scss',
})
export class DamageMultiplierSelector {
  protected readonly bodyParts: BodyPart[] = ['body', 'head', 'leg'];
  protected bodyPart: BodyPart = 'body';
  protected bodyPartChange = output<BodyPart>();

  protected selectBodyPart(selection: BodyPart) {
    this.bodyPart = selection;
    this.bodyPartChange.emit(this.bodyPart);
  }

  public isSelectedBodyPart(selection: BodyPart): boolean {
    return this.bodyPart === selection;
  }

  public get selectedBodyPartLabel(): string {
    return this.bodyPart;
  }
}
