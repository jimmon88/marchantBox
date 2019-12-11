import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {DashboardService} from './../services/dashboard.service';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.sass']
})
export class CallbackComponent implements OnInit {

  cookiesVal;
  constructor(
    private auth: AuthService,
    private productService: DashboardService,
    private router: Router,
    private location:Location,
    private cookieService: CookieService,
  ) { }
  
  

  ngOnInit() {
    //this.cookieService.deleteAll();
    this.cookiesVal = this.cookieService.get('cookiesVal');
     if (!this.cookiesVal) {
      // this.location.replaceState('/');
       this.router.navigate(['/dashboards']); 
     }
     
    this.auth.userProfile$.subscribe(
      value =>  this.productService.loginSessionStore(value));     
    this.auth.handleAuthCallback();    
  }

}