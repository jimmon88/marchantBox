import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import {DashboardService} from '../../../services/dashboard.service';
import { Location } from '@angular/common';
import { CrmapiListsItem } from '../../../model/apilist.model';
import { Router,ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {AuthenticationService} from '../../../services/authentication.service';


@Component({
  selector: 'app-crmapi-list',
  templateUrl: './crmapi-list.component.html',
  styleUrls: ['./crmapi-list.component.sass']
})
export class CrmapiListComponent implements OnInit {

  isLoading = true;
  cookiesVal;
  
  public displayedColumns = ['crm_label', 'crm_apiUsername', 'crm_apiPassword','crm_apiType','action'];
  public dataSource = new MatTableDataSource<CrmapiListsItem>();
 // @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatSort, {static: false}) sort: MatSort;
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(public productService: DashboardService,private router: Router,
    private location:Location,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
  ) { 
        // redirect to home if not logged in
        if (!this.authenticationService.currentUserValue) { 
          this.location.replaceState('/');
          this.router.navigate(['login']);
        }
  }

    ngOnInit() {      
      this.getAllCRMapis();  
    }
  
   public getAllCRMapis = () => {
    this.productService.getapiCrmData()
    .subscribe(res => {
      this.dataSource.data = res as CrmapiListsItem[];
      
    })
  }
  

}
