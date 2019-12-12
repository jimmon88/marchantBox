import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UsersAddModel } from '../user-add/addusers.model';
import { Router,ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { UsersAddModelList } from '../../model/userlist.model';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';




@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {
  user: UsersAddModel = new UsersAddModel();
  userForm:FormGroup;

  backendLiveURL = environment.apiUrl+"api/shows";
  constructor(private http: HttpClient,
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private location:Location,
    private productService: DashboardService,
    ) { }
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
     
   
        this.formUserval = {users_name:this.user.users_name, user_desc:this.user.user_desc,
          users_status:this.user.users_status,users_id:this.user.users_id};
      this.productService.updateProduct(this.id, this.formUserval)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/users']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
       
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
