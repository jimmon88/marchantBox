import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { CrmapiModelLists } from './addapi.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import {DashboardService} from '../../../services/dashboard.service';
import { environment } from '../../../../environments/environment';
import {AuthenticationService} from '../../../services/authentication.service';



export interface Api {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crmapi-add',
  templateUrl: './crmapi-add.component.html',
  styleUrls: ['./crmapi-add.component.sass']
})

export class CrmapiAddComponent implements OnInit {
  
  apis: Api[] = [
    {value: 'apis-0', viewValue: 'LIMELIGHT'},
    {value: 'apis-1', viewValue: 'KONNEKTIVE'},
    {value: 'apis-2', viewValue: 'RESPONSE'},
    {value: 'apis-3', viewValue: 'VELOX'},
    {value: 'apis-4', viewValue: 'EMANAGE'},
  ];
  
  crm: CrmapiModelLists = new CrmapiModelLists();
  crmForm:FormGroup;
  backendLiveURL = environment.apiUrl+"api/showtest";
  constructor(
    private http: HttpClient,
    private location:Location,
    private formBuilder:FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private productService: DashboardService,
    private cookieService: CookieService,
  ) {
      // redirect to home if not logged in
      if (!this.authenticationService.currentUserValue) { 
        this.location.replaceState('/');
        this.router.navigate(['login']);
      }
   }

  auth0Subvalue;
  cookiesVal;
  formProductval;

  ngOnInit() {
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
  
    
      this.formProductval = {crm_label:this.crm.crm_label,crm_apiEndpoint:this.crm.crm_apiEndpoint, crm_apiUsername:this.crm.crm_apiUsername,
        crm_apiPassword:this.crm.crm_apiPassword,crm_apiType:this.crm.crm_apiType};
    
      this.productService.addCrmApis(this.formProductval)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
        });
      
      
       
    }

}
