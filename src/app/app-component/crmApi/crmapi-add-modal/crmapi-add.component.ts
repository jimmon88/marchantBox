import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { CrmapiModelLists } from 'src/app/model/addapi.model';
import { Config } from 'src/app/core/config';
import { Api } from 'src/app/model/api.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrmapiService } from 'src/app/services/crmapi.service';
import { NotificationService } from 'src/app/core/notification.service';
import { ApplicationStateService } from 'src/app/services/application-state.service';


@Component({
  selector: 'app-crmapi-add',
  templateUrl: './crmapi-add.component.html',
  styleUrls: ['./crmapi-add.component.scss']
})

export class CrmapiAddComponent implements OnInit {

  apis: Api[] = Config.APILIST

  crm: CrmapiModelLists = new CrmapiModelLists();
  crmForm: FormGroup;
  // backendLiveURL = this.auth.basicURLcommon + "api/showtest";
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private CrmapiService: CrmapiService,
    public dialogRef: MatDialogRef<CrmapiAddComponent>,
    public notification: NotificationService,
    private ApplicationStateService: ApplicationStateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  auth0Subvalue;
  cookiesVal;
  formProductval;

  ngOnInit() {

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
    if (this.crmForm.valid) {
      this.formProductval = { crm_label: this.crmForm.value.crm_label, crm_apiUsername: this.crmForm.value.crm_apiUsername, crm_apiPassword: this.crmForm.value.crm_apiPassword, crm_apiEndpoint: this.crmForm.value.crm_apiEndpoint, crm_apiType: this.crmForm.value.crm_apiType }
      console.log(this.formProductval)
      this.CrmapiService.addCrmApis(this.formProductval)
        .subscribe(res => {
          let id = res['_id'];
          this.notification.success('CRM Api added successfully', 'Success', {
            closeButton: true,
            timeOut: 5000
          });
          this.ApplicationStateService.setCrmAPIState({ add: true });
          this.dialogRef.close();
        }, (err) => {
          console.log(err);
        });

    }

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
