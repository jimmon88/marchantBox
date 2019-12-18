import { Component,Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {DashboardService} from '../services/dashboard.service';
import {AuthenticationService} from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';






@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  cookiesVal;
  childMessage;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(    private authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private location:Location,
    private router: Router,
    private productService: DashboardService,) {
    this.cookiesVal = localStorage.getItem('toolbarVal');
    }

  logout() {
    this.authenticationService.logout();
    this.location.replaceState('/');
    this.router.navigate(['/']);
  }

  ngOnInit() {
   
  }
}
