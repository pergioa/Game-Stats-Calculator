import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gun } from '../models/gun.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  protected http = inject(HttpClient);

  public getGuns(): Observable<Gun[]>{
    return this.http.get<Gun[]>('http://localhost:5187/api/guns')
  }
}
