import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Location } from '@angular/common';
import { CrmapiListsItem } from '../../../model/apilist.model';
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

import { MatTableDataSource, MatSort, MatPaginator, MatDialog, Sort } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';
import { CrmapiAddComponent } from '../crmapi-add-modal/crmapi-add.component';
import { NotificationService } from 'src/app/core/notification.service';
import { ApplicationStateService } from 'src/app/services/application-state.service';


@Component({
  selector: 'app-crmapi-list',
  templateUrl: './crmapi-list.component.html',
  styleUrls: ['./crmapi-list.component.scss']
})
export class CrmapiListComponent implements OnInit {

  isLoading = false;
  overlay = false;
  cookiesVal;
  sortedData: CrmapiListsItem[];

  public displayedColumns = ['crm_label', 'crm_apiUsername', 'crm_apiPassword', 'crm_apiType', 'action'];
  public dataSource = new MatTableDataSource<CrmapiListsItem>();
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public productService: DashboardService, private router: Router,
    private location: Location,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notification: NotificationService,
    private ApplicationStateService: ApplicationStateService,

  ) {
    // // redirect to home if not logged in
    // if (!this.authenticationService.currentUserValue) {
    //   this.location.replaceState('/');
    //   this.router.navigate(['login']);
    // }
    this.sortedData = this.dataSource.data.slice();
  }

  ngOnInit() {

    this.getAllCRMapis();
    this.ApplicationStateService.onCrmAPItState().subscribe(() => {
      this.getAllCRMapis();
    })

  }


  public getAllCRMapis = () => {
    this.isLoading = true;
    this.productService.getapiCrmData()
      .subscribe(res => {
        this.dataSource.data = res as CrmapiListsItem[];
        this.sortedData = this.dataSource.data.slice();
        this.isLoading = false;

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
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'crm_label': return compare(a.crm_label, b.crm_label, isAsc);
        case 'crm_apiUsername': return compare(a.crm_apiUsername, b.crm_apiUsername, isAsc);
        case 'crm_apiPassword': return compare(a.crm_apiPassword, b.crm_apiPassword, isAsc);
        case 'crm_apiType': return compare(a.crm_apiType, b.crm_apiType, isAsc);
        case 'crm_apiEndpoint': return compare(a.crm_apiEndpoint, b.crm_apiEndpoint, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



