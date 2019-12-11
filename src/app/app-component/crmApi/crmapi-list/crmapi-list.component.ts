import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import {DashboardService} from '../../../services/dashboard.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { CrmapiListsItem } from '../../../model/apilist.model';
import { Router,ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

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
    private cookieService: CookieService,
    public auth: AuthService) { }

    ngOnInit() {

      //this.cookiesVal = this.cookieService.get('cookiesVal');
  
      //   if (!this.cookiesVal) {
      //     alert(this.auth.loggedIn);
      //     this.location.replaceState('/');
      //     this.router.navigate(['/']); 
      // }
      this.getAllCRMapis();

  
    }
  //   ngAfterViewInit(): void {
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  
  //  }

   public getAllCRMapis = () => {
    this.productService.getapiCrmData()
    .subscribe(res => {
      //this.isLoading = false;
      this.dataSource.data = res as CrmapiListsItem[];
      
    })
  }
  

}
