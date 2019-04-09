import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  public redirectUrl: string;
  public loginUrl = '/auth/login';
  private isLoginIn$: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn); 
  
  constructor(private localStorage: LocalStorageService, private router: Router) {
    if (this.localStorage.get('user')) {
      this.isLoggedIn = true;
      this.isLoginIn$.next(this.isLoggedIn);
    }
  }

  getIsLoginIn(): Observable<boolean> {
    return this.isLoginIn$.asObservable();
  }

  login(): boolean {
    this.isLoggedIn = true;
    this.isLoginIn$.next(this.isLoggedIn);
    return true;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isLoginIn$.next(this.isLoggedIn);
    this.localStorage.remove('user');
    this.router.navigate([this.loginUrl]);
  }
}
