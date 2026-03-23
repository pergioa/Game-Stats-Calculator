import { Routes } from '@angular/router';
import { GunTable } from "./components/gun-table/gun-table";
import { Simulation } from "./components/simulation/simulation";
import { GrenadeTable } from './components/grenade-table/grenade-table';

export const routes: Routes = [
    {path:'', redirectTo: 'gun-comparison', pathMatch: 'full'},
    {path:'gun-comparison',component:GunTable},
    {path:'simulation', component: Simulation},
    {path:'grenade-comparison', component: GrenadeTable}
];
