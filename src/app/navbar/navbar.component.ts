import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  hover = true;
  cookiesVal;
  showDetail;
  hideDetail;
  constructor(public auth: AuthService,public cookieService: CookieService) { }

  ngOnInit() {

    this.cookiesVal = this.cookieService.get('cookiesVal');
    if(this.cookiesVal){
      //alert('ss');
      this.showDetail = true    
    }else{
      //alert('sss');
      this.hideDetail = true
    }

  }

}