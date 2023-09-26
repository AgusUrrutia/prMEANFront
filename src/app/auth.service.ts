import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Rt } from './rt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): Observable<boolean> {
    return of(true)
  }
  getUserData():{}{
    return {};
  }

}
