import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Grenade } from '../models/grenade.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrenadeService {
  protected http = inject(HttpClient);

  public getGrenades(): Observable<Grenade[]>{
    return this.http.get<Grenade[]>('http://localhost:5187/api/grenades')
  }
}
