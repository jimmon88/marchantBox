import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ProductAddModel } from '../product-add/addproduct.model';
import { Router,ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { ProductsListsItem } from '../../model/productlist.model';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {
  user: ProductAddModel = new ProductAddModel();
  productForm:FormGroup;

  //backendLiveURL = "http://127.0.0.1:8080/api/shows";
  backendLiveURL = this.auth.basicURLcommon+"api/shows";
  //backendLiveURL = "https://lumen.lose25.com/api/shows";
  
  constructor(
    private http: HttpClient,
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location,
    private cookieService: CookieService,
    private productService: DashboardService,
    public auth: AuthService) { }
  selected: string;
  id: number;
  cookiesVal;
  filter: any;
  product_name:string='';
  product_desc:string='';
  product_status:string='';
  true = 'true';
  auth0Subvalue;
  formProductval;
  isLoadingResults = false;
  onProductFormSubmit(){
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
      //  this.router.navigate(['/product']);
      this.auth.userProfile$.subscribe(
        valuesub =>  this.auth0Subvalue = valuesub.sub);
        this.formProductval = {product_name:this.user.product_name, product_desc:this.user.product_desc,
        product_status:this.user.product_status,product_id:this.user.product_id,sub:this.auth0Subvalue};
      this.productService.updateProductname(this.id, this.formProductval)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/product']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
       
    }
    getProduct(id) {
      //alert(id);getProduct
      //this.productService.Ongetdata();
      this.productService.getProduct(id).subscribe(
        data => {
        this.id = data[0].id;
        this.productForm.setValue({
          
          product_status: data[0].product_status,
          product_name: data[0].product_name,
          product_desc: data[0].product_desc,
          product_id: data[0].product_id,
        });
      }); 
    }
   // data => console.log(data[0].product_name),
    ngOnInit() {
      this.cookiesVal = this.cookieService.get('cookiesVal');

      if (!this.cookiesVal) {
        //alert(this.auth.loggedIn);
        this.location.replaceState('/');
        this.router.navigate(['/']); 
    }
      this.getProduct(this.route.snapshot.params['id']);
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
