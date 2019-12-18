import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ProductAddModel } from './addproduct.model';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import {AuthenticationService} from '../../services/authentication.service';




@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  user: ProductAddModel = new ProductAddModel();
  productForm:FormGroup;
  backendLiveURL = environment.apiUrl+"api/show";


  constructor(
    private http: HttpClient,
    private location:Location,
    private formBuilder:FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService

    ) {
        // redirect to home if not logged in
      if (!this.authenticationService.currentUserValue) {
        this.location.replaceState('/');
        this.router.navigate(['login']);
      }

    }
  filter: any;
  auth0Subvalue;
  toolbarVal;
  formProductval;



 onProductFormSubmit(){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

    this.formProductval = {product_name:this.user.product_name, product_desc:this.user.product_desc,
    product_status:this.user.product_status,product_id:this.user.product_id};

      this.http.post(this.backendLiveURL,this.formProductval,{headers})
     .subscribe(
       data => console.log(data),
       error => console.log(error)
     );
     this.router.navigate(['/products']);

  }
ngOnInit() {

  this.toolbarVal = {icon:'', title:'Products >> Add',path:''};
    this.authenticationService.storeTitleval(this.toolbarVal);

    //alert(this.cookiesVal);
  this.productForm = this.formBuilder.group({
    'product_name':[this.user.product_name,[
      Validators.required
    ]],
    'product_desc':[this.user.product_desc,[

    ]],

    'product_status':[this.user.product_desc,[
    ]],

    'product_id':[this.user.product_id,[
      Validators.required
    ]]
  });
  }

}
