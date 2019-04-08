import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage;
  constructor() {
    this.localStorage = window.localStorage;
  }

  public remove(item: string): void {
    this.localStorage.removeItem(item);
  }

  public set(key: string, value: any): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    return this.localStorage.getItem(key);
  }
}
