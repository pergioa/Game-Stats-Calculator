import { Routes } from '@angular/router';
import { GunTable } from "./components/gun-table/gun-table";
import { Simulation } from "./components/simulation/simulation";

export const routes: Routes = [
    {path:'',component:GunTable},
    {path:'simulation', component: Simulation}
];
