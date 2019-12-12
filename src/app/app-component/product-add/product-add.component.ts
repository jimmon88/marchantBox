import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ProductAddModel } from './addproduct.model';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.sass']
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
    ) { }
  filter: any;
  auth0Subvalue;
  cookiesVal;
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

  this.cookiesVal = this.cookieService.get('cookiesVal');

      if (!this.cookiesVal) {
        //alert(this.auth.loggedIn);
        this.location.replaceState('/');
        this.router.navigate(['/']); 
    }

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
