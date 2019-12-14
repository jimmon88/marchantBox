import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DashboardService } from '../../../services/dashboard.service';
import { CrmapiModelLists } from 'src/app/model/addapi.model';
import { Config } from 'src/app/core/config';
import { Api } from 'src/app/model/api.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrmapiService } from 'src/app/services/crmapi.service';
import { NotificationService } from 'src/app/core/notification.service';






@Component({
  selector: 'app-crmapi-add',
  templateUrl: './crmapi-add.component.html',
  styleUrls: ['./crmapi-add.component.sass']
})

export class CrmapiAddComponent implements OnInit {

  apis: Api[] = Config.APILIST

  crm: CrmapiModelLists = new CrmapiModelLists();
  crmForm: FormGroup;
 // backendLiveURL = this.auth.basicURLcommon + "api/showtest";
  constructor(
    private http: HttpClient,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private CrmapiService: CrmapiService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<CrmapiAddComponent>,
    private notification:NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     dialogRef.disableClose = true;
  }

  auth0Subvalue;
  cookiesVal;
  formProductval;

  ngOnInit() {
    this.notification.info("loaded");
    this.crmForm = this.formBuilder.group({
      'crm_label': [this.crm.crm_label, [
        Validators.required
      ]],
      'crm_apiUsername': [this.crm.crm_apiUsername, [
        Validators.required
      ]],

      'crm_apiPassword': [this.crm.crm_apiPassword, [
        Validators.required
      ]],
      'crm_apiEndpoint': [this.crm.crm_apiPassword, [
        Validators.required
      ]],

      'crm_apiType': [this.crm.crm_apiType, [
        Validators.required
      ]]
    });
  }


  oncrmFormSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    // this.auth.userProfile$.subscribe(
    //   valuesub => this.auth0Subvalue = valuesub.sub);
    // this.formProductval = {
    //   crm_label: this.crm.crm_label, crm_apiEndpoint: this.crm.crm_apiEndpoint, crm_apiUsername: this.crm.crm_apiUsername,
    //   crm_apiPassword: this.crm.crm_apiPassword, crm_apiType: this.crm.crm_apiType, sub: this.auth0Subvalue
    // };
    //alert(this.auth.userProfile$.sub);
    //alert(this.user.email);
    //alert(this.auth0Subvalue);
    //console.log(this.user);

    this.CrmapiService.addCrmApis(this.formProductval)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
      });

    //   this.http.post(this.backendLiveURL,this.formProductval,{headers})
    //  .subscribe(
    //    data => console.log(data),
    //    error => console.log(error)
    //  );

  }
  closeDialog() {
    this.dialogRef.close();
  }

}
