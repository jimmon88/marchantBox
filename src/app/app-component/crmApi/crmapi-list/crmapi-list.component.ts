import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Location } from '@angular/common';
import { CrmapiListsItem } from '../../../model/apilist.model';
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

import { MatTableDataSource, MatSort, MatPaginator,MatDialog} from '@angular/material';
import {AuthenticationService} from '../../../services/authentication.service';
import { CrmapiAddComponent } from '../crmapi-add-modal/crmapi-add.component';
import { NotificationService } from 'src/app/core/notification.service';


@Component({
  selector: 'app-crmapi-list',
  templateUrl: './crmapi-list.component.html',
  styleUrls: ['./crmapi-list.component.sass']
})
export class CrmapiListComponent implements OnInit {

  isLoading = true;
  cookiesVal;

  public displayedColumns = ['crm_label', 'crm_apiUsername', 'crm_apiPassword', 'crm_apiType', 'action'];
  public dataSource = new MatTableDataSource<CrmapiListsItem>();
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public productService: DashboardService,private router: Router,
    private location:Location,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notification: NotificationService
  ) {
        // redirect to home if not logged in
        if (!this.authenticationService.currentUserValue) {
          this.location.replaceState('/');
          this.router.navigate(['login']);
        }
  }

  ngOnInit() {

    this.getAllCRMapis();
    this.notification.error('An unexpected internal error has occurred.', 'Error', {
      closeButton: true,
      timeOut: 5000
    });

  }


  public getAllCRMapis = () => {
    this.productService.getapiCrmData()
      .subscribe(res => {
        this.dataSource.data = res as CrmapiListsItem[];

      })
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CrmapiAddComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }



}
