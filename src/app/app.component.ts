import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from "@angular/router";
import {DashboardService} from './services/dashboard.service';
import {AuthenticationService} from './services/authentication.service';
import { User } from './model/user';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  sessionData;
  LoginViewpage;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService,private router: Router,private productService: DashboardService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
