import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators ,FormsModule,NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { loginModel } from './loginUser.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import {DashboardService} from '../../services/dashboard.service';
import { createFalse } from 'typescript/lib/tsserverlibrary';




@Component({
  selector: 'app-login-crm',
  templateUrl: './login-crm.component.html',
  styleUrls: ['./login-crm.component.sass']
})
export class LoginCrmComponent implements OnInit {
  login: loginModel = new loginModel();
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  showErrorMessage;
  LoginViewpage;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: DashboardService,

  ) { }

  // //redirect to home if already logged in
  //       if (this.authenticationService.currentUserValue) { 
  //           this.router.navigate(['/']);
  //       }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboards';
  }

  onLoginSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.showErrorMessage = false;
    this.productService.login(this.login)
        .pipe(first())
        .subscribe(
            data => {
                
                localStorage.setItem('currentUser', JSON.stringify(data));
                localStorage.setItem('userToken', data.token);
                if(localStorage.getItem('userToken')){
                    this.router.navigate([this.returnUrl]);
                }else{
                    this.showErrorMessage =true;
                }
                //alert(localStorage.getItem('userToken'));
                this.router.navigate([this.returnUrl]);
            },
            error => {
                //this.alertService.error(error);
            });
}

}
