import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../services/dashboard.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CrmapiModelLists } from '../crmapi-add/addapi.model';
import { Router,ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { CrmapiListsItem } from '../../../model/apilist.model';
import { AuthService } from '../../../auth.service';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crmapi-edit',
  templateUrl: './crmapi-edit.component.html',
  styleUrls: ['./crmapi-edit.component.sass']
})
export class CrmapiEditComponent implements OnInit {
  crm: CrmapiModelLists = new CrmapiModelLists();
  crmForm:FormGroup;

  auth0Subvalue;
  cookiesVal;
  formProductval;
  id;

  backendLiveURL = this.auth.basicURLcommon+"api/shows";


  constructor( private http: HttpClient,
    private location:Location,
    private formBuilder:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: DashboardService,
    private cookieService: CookieService,
    public auth: AuthService) { }

 
    ngOnInit() {
      this.getCrmdata(this.route.snapshot.params['id']);
      this.crmForm = this.formBuilder.group({
        'crm_label':[this.crm.crm_label,[
          Validators.required
        ]],
        'crm_apiUsername':[this.crm.crm_apiUsername,[
          Validators.required
        ]],
            
        'crm_apiPassword':[this.crm.crm_apiPassword,[
          Validators.required
        ]],
        'crm_apiEndpoint':[this.crm.crm_apiPassword,[
          Validators.required
        ]],
        
        'crm_apiType':[this.crm.crm_apiType,[
          Validators.required
        ]]
      });
    }
  oncrmFormSubmit(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*' 
    });
  
    this.auth.userProfile$.subscribe(
      valuesub =>  this.auth0Subvalue = valuesub.sub);
      this.formProductval = {crm_label:this.crm.crm_label,crm_apiEndpoint:this.crm.crm_apiEndpoint, crm_apiUsername:this.crm.crm_apiUsername,
        crm_apiPassword:this.crm.crm_apiPassword,crm_apiType:this.crm.crm_apiType,sub:this.auth0Subvalue};
          
        this.http.post(this.backendLiveURL,this.formProductval,{headers})
       .subscribe(
         data => console.log(data),
         error => console.log(error)
       );
       this.router.navigate(['/products']);
       
    }
    getCrmdata(id) {
      //alert(id);getProduct
      //this.productService.Ongetdata();
      // this.productService.getCrmdata(id).subscribe(
      //   data => {
      //   this.id = data[0].id;
      //   this.crmForm.setValue({
          
      //     crm_label: data[0].crm_label,
      //     crm_apiUsername: data[0].crm_apiUsername,
      //     crm_apiPassword: data[0].crm_apiPassword,
      //     crm_apiEndpoint: data[0].crm_apiEndpoint,
      //     crm_apiType: data[0].crm_apiType,
      //   });
      // }); 
    }

}
