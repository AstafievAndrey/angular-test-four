import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IndexedDbService } from '@core/services/indexed-db.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { User } from '@core/interfaces/user';
import { Message } from '@core/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private indexedDb: IndexedDbService, private localStorage: LocalStorageService) { }

  public getUser(): User {
    return JSON.parse(this.localStorage.get('user'));
  }

  public addMessage(message: Message): Observable<number> {
    return this.indexedDb.add('messages', message);
  }

  public editMessage(message: Message): Observable<number> {
    return this.indexedDb.put('messages', message);
  }

  public deleteMessage(id: number): void {
    this.indexedDb.delete('messages', id);
  }

  public getAll(): Observable<any> {
    return this.indexedDb.getAll('messages', 'messages').pipe(map(
      res => {
        return Observable.create((observer) => {
          this.indexedDb.getById('users', 'users', res.user_id)
            .subscribe(user => {
              observer.next({...res, user});
              observer.complete();
            });
        });
      }
    ));
  }

}
