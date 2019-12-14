import { Injectable } from '@angular/core';
import { Observable,of,throwError,BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpParams } from '@angular/common/http';
import { ProductsListsItem } from './../model/productlist.model';
import { CrmapiListsItem } from './../model/apilist.model';
import { UsersAddModelList } from './../model/userlist.model';
import { Router,ActivatedRoute } from "@angular/router";
import { environment } from '../../environments/environment';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  //private currentUserSubject: BehaviorSubject<any>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

   auth0Subvalue;
   apiUrltest = environment.apiUrl+"api/gets";
    userGetUrl = environment.apiUrl+"api/getsUserEdit";
    updateProductURL = environment.apiUrl+"api/updateProduct";
    updateProductnameURL = environment.apiUrl+"api/updateProductname";

    loginSession = environment.apiUrl+"api/loginSetSession"
    backendLiveURL = environment.apiUrl+"api/get";
    GetProducts = environment.apiUrl+"api/productGet";
    backendUserdetailURL = environment.apiUrl+"api/userGetdetails";
    apiaddCrmApis = environment.apiUrl+"api/apiaddCrmApis";
    apiListCrmApis = environment.apiUrl+"api/apiListCrmApis";
    apiauthenticate = environment.apiUrl+"api/authenticate";
    showErrorMessage;
    loginauth;


  constructor(private http: HttpClient,private router: Router,
    private route: ActivatedRoute,) {

  }
  public getProductData = () => {
    return this.http.get(this.backendLiveURL);
  }
  public Ongetuserdata = () => {
    // this.auth.userProfile$.subscribe(
    //   valuesub =>  this.auth0Subvalue = valuesub.sub);
      let params = new HttpParams();
      params = params.append('auth0', this.auth0Subvalue);
      //params = params.append('param-2', this.auth0Subvalue);
      let headers = new HttpHeaders();
      headers  = headers.append('Content-Type', 'application/json');
      headers  = headers.append('Access-Control-Allow-Origin', '*');
      return this.http.get(this.backendUserdetailURL,{headers,params});
  }

  updateProduct (id, product): Observable<any> {
    const url = `${this.updateProductURL}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProductURL'))
    );
  }
  updateProductname (id, product): Observable<any> {
    const url = `${this.updateProductnameURL}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
     Ongetdata():Observable<ProductsListsItem[]>{
      // this.auth.userProfile$.subscribe(
      //   valuesub =>  this.auth0Subvalue = valuesub.sub);
        let params = new HttpParams();
        params = params.append('auth0', this.auth0Subvalue);
        //params = params.append('param-2', this.auth0Subvalue);
        let headers = new HttpHeaders();
        headers  = headers.append('Content-Type', 'application/json');
        headers  = headers.append('Access-Control-Allow-Origin', '*');
      return this.http.get<ProductsListsItem[]>(this.backendLiveURL,{headers,params});
    }
    loginSessionStore(value){
      //console.log(value);
      this.http.post(this.loginSession,value,httpOptions)
       .subscribe(
         data => console.log(data),
         error => console.log(error)
       );

    }
    // Ongetuserdatas():Observable<UsersAddModelList[]>{
    //   this.auth.userProfile$.subscribe(
    //     valuesub =>  this.auth0Subvalue = valuesub.sub);
    //     let params = new HttpParams();
    //     params = params.append('auth0', this.auth0Subvalue);
    //     //params = params.append('param-2', this.auth0Subvalue);
    //     let headers = new HttpHeaders();
    //     headers  = headers.append('Content-Type', 'application/json');
    //     headers  = headers.append('Access-Control-Allow-Origin', '*');
    //   return this.http.get<UsersAddModelList[]>(this.backendUserdetailURL,{headers,params});
    // }
    getProduct(id: number): Observable<ProductsListsItem> {
      const url = `${this.apiUrltest}/${id}`;
      return this.http.get<ProductsListsItem>(url).pipe(
        tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<ProductsListsItem>(`getProduct id=${id}`))
      );
    }
    // getUser(id: number) {
    //   return this.http.get<UsersAddModelList>(this.userGetUrl + '/' + id);
    // }

    getUser(id: number): Observable<UsersAddModelList> {
      const url = `${this.userGetUrl}/${id}`;
      return this.http.get<UsersAddModelList>(url).pipe(
        tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<UsersAddModelList>(`getUser id=${id}`))
      );
    }
    public sendGetRequest(){
      return this.http.get(this.GetProducts).pipe(catchError(this.handleError));
    }
    //Login Details

    get isLoggedIn() {
      return this.loggedIn.asObservable();
    }
    logout() {
      localStorage.clear();
      this.loggedIn.next(false);
      this.router.navigate(['/']);
    }

    logins(login) {
      return this.http.post<any>( this.apiauthenticate,login )
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('userToken',(user.token));
              if(localStorage.getItem('userToken')){
                this.loggedIn.next(true);
                this.router.navigate(['dashboard']);
              }
              //console.log((user.token));
              //this.currentUserSubject.next(user);
              return user;
          }));
  }
  login(login) {
    return this.http.post<any>( this.apiauthenticate,login );


}

  // login(login) {
  //   return this.http.post<any>( this.apiauthenticate,login );
      //   .pipe(map(user => {
      //       // store user details and jwt token in local storage to keep user logged in between page refreshes
      //       localStorage.setItem('currentUser', JSON.stringify(user));
      //       this.currentUserSubject.next(user);

      //       return user;
      //   },

      // ))

//}
    //Api section getapiCrmData

    //add apis

    addCrmApis (product): Observable<CrmapiListsItem> {
      return this.http.post<CrmapiListsItem>(this.apiaddCrmApis, product, httpOptions).pipe(
        tap((crmadd: CrmapiListsItem) => console.log(`added product w/ id=${crmadd.id}`)),
        catchError(this.handleError<CrmapiListsItem>('addCrmApis'))
      );
    }
    //list apis
    public getapiCrmData = () => {
      return this.http.get(this.apiListCrmApis);
    }


    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }


}
