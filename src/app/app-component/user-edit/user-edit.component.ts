import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UsersAddModel } from '../user-add/addusers.model';
import { Router,ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { UsersAddModelList } from '../../model/userlist.model';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {
  user: UsersAddModel = new UsersAddModel();
  userForm:FormGroup;

 // backendLiveURL = "http://127.0.0.1:8080/api/shows";
  backendLiveURL = this.auth.basicURLcommon+"api/shows";
  //backendLiveURL = "https://lumen.lose25.com/api/shows";
  constructor(private http: HttpClient,
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private location:Location,
    private productService: DashboardService,
    public auth: AuthService) { }
  selected: string;
  id: number;
  filter: any;
  users_name:string='';
  user_desc:string='';
  users_status:string='';
  users_id:string='';
  true = 'true';
  auth0Subvalue;
  cookiesVal;
  formUserval;
  products = [];
  isLoadingResults = false;
  onuserFormSubmit(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*' 
    });
      //alert(this.user.product_status);
      //console.log(this.user);
      //   this.http.post(this.backendLiveURL,this.user,{headers})
      //  .subscribe(
      //    data => console.log(data),
      //    error => console.log(error)
      //  );
      this.auth.userProfile$.subscribe(
        valuesub =>  this.auth0Subvalue = valuesub.sub);
        this.formUserval = {users_name:this.user.users_name, user_desc:this.user.user_desc,
          users_status:this.user.users_status,users_id:this.user.users_id,sub:this.auth0Subvalue};
      this.productService.updateProduct(this.id, this.formUserval)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/users']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
       //this.router.navigate(['/product']);
       
    }
    getUser(id) {
      this.productService.getUser(id).subscribe(
        data => {
        this.id = data[0].id;
        this.userForm.setValue({
          
          users_name: data[0].user_name,
          user_desc: data[0].user_desc,
          users_id: data[0].users_id,
          users_status: data[0].users_status,
          
        });
      }); 
    }

    ngOnInit() {

      this.cookiesVal = this.cookieService.get('cookiesVal');

      if (!this.cookiesVal) {
        this.location.replaceState('/');
        this.router.navigate(['/']); 
      }
      this.productService.sendGetRequest().subscribe((data: any[])=>{
        //console.log(data);
        this.products = data;
      }) 
      this.getUser(this.route.snapshot.params['id']);
      this.userForm = this.formBuilder.group({
        'users_name':[this.user.users_name,[
          Validators.required
        ]],
        'users_id':[this.user.users_id,[
          Validators.required
        ]],
        'user_desc':[this.user.user_desc,[
        ]],
        
        'users_status':[this.user.users_status,[ 
          Validators.required     
        ]]
       
      });
      }

}
