import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CrmapiListsItem } from '../model/apilist.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from '../core/config';
import { tap, catchError } from 'rxjs/operators';
import { NotificationService } from '../core/notification.service';
import { HttpError } from '../model/http-error.model';

@Injectable({
  providedIn: 'root'
})
export class CrmapiService {

  constructor(private http: HttpClient, private router: Router, private notification: NotificationService) { }

  addCrmApis(item): Observable<CrmapiListsItem> {
    return this.http.post<CrmapiListsItem>(Config.URLS.crmapiAdd, item).pipe(
      tap((crmadd: CrmapiListsItem) => console.log(`added crm api  id=${crmadd.id}`)),
      catchError((error: HttpError) => {
        this.notification.error(error.message);
        return this.handleError<CrmapiListsItem>('addCrmApis')
      })
    );
  }


  public getCrmapi(): Observable<CrmapiListsItem[]> {
    return this.http.get<CrmapiListsItem[]>(Config.URLS.apiListCrmApis)
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
