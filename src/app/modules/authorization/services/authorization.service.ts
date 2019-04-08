import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

import { IndexedDbService } from '@core/services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private indexedDb: IndexedDbService) { }

  public searchUser(login: string): Observable<string> {
    return this.indexedDb.get('users', 'users', 'login', login);
  }

  public addUser(data) {
    return this.indexedDb.add('users', {...data, active: true});
  }

  public checkLoginValidate(type: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return Observable.create((observer) => {
        this.searchUser(control.value).subscribe(
            login => {
              switch (type) {
                case 'missing':
                  observer.next(login ? {loginExists: true} : null);
                  break;
                case 'exists':
                  observer.next(login ? null : {loginMissing: true} );
                  break;
                default:
                  observer.next(null);
              }
              observer.complete();
            }
          );
      });
    };
  }

}
