import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Location } from '@angular/common';
import {DashboardService} from '../../services/dashboard.service';
import { CookieService } from 'ngx-cookie-service';
import {AuthenticationService} from '../../services/authentication.service';



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
    private location:Location,
    private productService: DashboardService,
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
  //*ngIf="!auth.loggedIn
  
  ngOnInit() {
   
  }

}
