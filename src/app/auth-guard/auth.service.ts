// auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APISERVICE } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;

  constructor(private apiService: APISERVICE) {
    const isLoggedIn = localStorage.getItem('accessToken') !== null;
    this.loggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
  }

  login(email: string, password: string): Observable<any> {
    return this.apiService.loginEmployee({ email, password }).pipe(
      tap((response: any) => {
        if (response.status) {
          this.setLoggedIn(true);
          localStorage.setItem('accessToken', response.accessToken);
        }
      })
    );
  }

  logout(): void {
    this.setLoggedIn(false);
    localStorage.removeItem('accessToken');
  }

  setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}
