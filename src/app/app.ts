import { Component, signal } from '@angular/core';
import { GunTable } from './components/gun-table/gun-table';

@Component({
  selector: 'app-root',
  imports: [GunTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('arc-damage-calculator');
}
