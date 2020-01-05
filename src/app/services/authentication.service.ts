import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { User } from "./../model/user";
import { Config } from "../core/config";
import { Router } from "@angular/router";

export class MenuItem {
  path: string;
  title: string;
  icon: string;
}

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  toolbartitle: MenuItem[];
  toolbarVal;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  storeTitleval(toolbarVal) {
    localStorage.setItem("toolbarVal", toolbarVal.title);
    return toolbarVal;
  }

  login(username, password) {
    return this.http
      .post<any>(`${environment.apiUrl}api/authenticate`, {
        username,
        password
      })
      .pipe(
        map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
