import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  constructor(private localStorage: LocalStorageService) {
    if (this.localStorage.get('user')) {
      this.isLoggedIn = true;
    }
  }

  login(): boolean {
    this.isLoggedIn = true;
    return true;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.localStorage.remove('user');
  }
}
