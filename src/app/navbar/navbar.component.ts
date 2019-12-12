import { Component, OnInit } from '@angular/core';
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
  constructor(public cookieService: CookieService) { }

  ngOnInit() {

  }

}