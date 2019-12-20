import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CrmapiModelLists } from '../model/addapi.model';



@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {


  private crmAPItState$: Subject<{ edit?: CrmapiModelLists; add?: boolean; delete?: boolean }> = new Subject();

  constructor() { }

  onCrmAPItState(): Observable<{  edit?: CrmapiModelLists; add?: boolean; delete?: boolean }> {
    return this.crmAPItState$.asObservable();
  }

  setCrmAPIState(state: { edit?: CrmapiModelLists; add?: boolean; delete?: boolean  }) {
    this.crmAPItState$.next(state);
  }

}
