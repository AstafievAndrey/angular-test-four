import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DB_NAME = 'Chat';
const DB_VERSION = 1;

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBDatabase = null;
  private request: IDBOpenDBRequest;

  constructor() {
    console.log('init indexdb service');
    this.request = window.indexedDB.open(DB_NAME, DB_VERSION);
    this.init();
  }

  private init(): void {
    this.request.onsuccess = (e: any) => {
      this.db = e.target.result;
      console.log(`openDb ${DB_NAME} version ${DB_VERSION}`, this.db);
    };
    this.request.onerror =  (e: any) => {
      console.log(`erorr: ${e.target.errorCode}`);
    };
    this.request.onupgradeneeded = (e: any) => {
      this.onUpgrade(e);
    };
  }

  public delete(table: string, key: number): void {
    const transaction = this.db.transaction([table], 'readwrite');
    const objectStore = transaction.objectStore(table);
    objectStore.delete(key);
  }

  public add(table: string, data: any): void {
    const transaction = this.db.transaction([table], 'readwrite');
    const objectStore = transaction.objectStore(table);
    objectStore.add(data);
  }

  public getAll(
    transactionName: string,
    objectStoreName: string,
    ): Observable<any> {
      return Observable.create((observer) => {
        const objectStore = this.db.transaction(transactionName).objectStore(objectStoreName);
        const request = objectStore.getAll();
        request.onsuccess = () => {
          for (const item of request.result) {
            observer.next(item);
          }
          observer.complete();
        };
      });
  }

  public get(
    transactionName: string,
    objectStoreName: string,
    indexName: string,
    value: any
  ): Observable<any> {
    return Observable.create((observer) => {
        const objectStore = this.db.transaction(transactionName).objectStore(objectStoreName);
        const request = objectStore.index(indexName).get(value);
        request.onsuccess = () => {
          observer.next(request.result ? request.result : null);
          observer.complete();
        };
    });
  }

  public onUpgrade(e: any): void {
    const thisDB = e.target.result;
    if (!thisDB.objectStoreNames.contains('users')) {
      const store = thisDB.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      store.createIndex('login', 'login', { unique: true });
      store.createIndex('active', 'active');
    }
    if (!thisDB.objectStoreNames.contains('messages')) {
      const store = thisDB.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
      store.createIndex('user_id', 'user_id');
    }
  }
}
