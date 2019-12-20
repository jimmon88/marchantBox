import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { UsersAddModel } from './addusers.model';
import {DashboardService} from '../../services/dashboard.service';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import {AuthenticationService} from '../../services/authentication.service';




@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user: UsersAddModel = new UsersAddModel();
  userForm:FormGroup;
  products = [];
  auth0Subvalue;
  formUserval;
  cookiesVal;
 // backendLiveURL = "https://lumen.lose25.com/api/addProduct";
 // backendLiveURL = 'http://127.0.0.1:8080/api/addProduct';

  backendLiveURL = environment.apiUrl+"api/addProduct";
  constructor(private http: HttpClient,
    private formBuilder:FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private location:Location,
    private productService: DashboardService) {
      // redirect to home if not logged in
      if (!this.authenticationService.currentUserValue) {
        this.location.replaceState('/');
        this.router.navigate(['login']);
    }
    }

  onuserFormSubmit(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
      //alert(this.user.product_status);
      //console.log(this.user);

        this.formUserval = {users_name:this.user.users_name, user_desc:this.user.user_desc,
          users_status:this.user.users_status,users_id:this.user.users_id,sub:this.auth0Subvalue};

        this.http.post(this.backendLiveURL,this.user,{headers})
       .subscribe(
         data => console.log(data),
         error => console.log(error)
       );
       this.router.navigate(['/users']);

    }

    ngOnInit() {


      this.productService.sendGetRequest().subscribe((data: any[])=>{
        //console.log(data);
        this.products = data;
      })
      this.userForm = this.formBuilder.group({
        'users_name':[this.user.users_name,[
          Validators.required
        ]],
        'user_desc':[this.user.user_desc,[

        ]],
        'users_status':[this.user.users_status,[
          Validators.required
        ]],

        'users_id':[this.user.users_id,[
          Validators.required
        ]]
      });
      }
}
