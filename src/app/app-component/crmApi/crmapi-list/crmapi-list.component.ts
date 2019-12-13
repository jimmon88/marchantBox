import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Location } from '@angular/common';
import { CrmapiListsItem } from '../../../model/apilist.model';
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { CrmapiAddComponent } from '../crmapi-add-modal/crmapi-add.component';

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

  constructor(public productService: DashboardService, private router: Router,
    private location: Location,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.getAllCRMapis();


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
