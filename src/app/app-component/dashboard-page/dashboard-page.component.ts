import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router} from "@angular/router";
import { Location } from '@angular/common';
import {DashboardService} from '../../services/dashboard.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit {
  myBackgroundImageUrl = 'https://www.terypurevigor.com/tryfree/cb/assets/images/bulb_icons.png'
  auth0Subvalue;
  cookieValue;
  constructor(
    private auth: AuthService,
    private location:Location,
    private productService: DashboardService,
    private router: Router,
    private cookieService: CookieService,
  ) { }
  //*ngIf="!auth.loggedIn
  
  ngOnInit() {
    if (!this.auth.loggedIn) {
     // this.location.replaceState('/');
      //this.router.navigate(['/']);
    }
    this.auth.userProfile$.subscribe(
      valuesub =>  this.auth0Subvalue = valuesub.email,
    );
    this.cookieService.set('cookiesVal', this.auth0Subvalue);
    this.cookieValue = this.cookieService.get('cookiesVal');
    //alert(this.cookieValue);

  }

}
