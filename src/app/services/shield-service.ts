import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shield } from '../models/shield.model';

@Injectable({
  providedIn: 'root',
})
export class ShieldService {
  protected http = inject(HttpClient);

  public getShields(): Observable<Shield[]>{
    return this.http.get<Shield[]>('http://localhost:5187/api/shields')
  }
}
