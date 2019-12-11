import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from "@angular/router";
import {DashboardService} from './services/dashboard.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  sessionData;
  LoginViewpage;
  constructor(public auth: AuthService,private router: Router,private productService: DashboardService,
  ) {}

  ngOnInit() {
    this.sessionData = localStorage.getItem('userToken');
    if(this.sessionData){
      //alert(this.sessionData );
      this.LoginViewpage = true;
      this.router.navigate(['dashboards']); 
    }else{
      this.LoginViewpage = false;
    }
    
    this.auth.localAuthSetup();
  }

}
