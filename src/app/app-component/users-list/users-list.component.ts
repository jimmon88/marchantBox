import { Component, OnInit, AfterViewInit,ViewChild} from '@angular/core';
import { UsersAddModelList } from '../../model/userlist.model';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {DashboardService} from '../../services/dashboard.service';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import {AuthenticationService} from '../../services/authentication.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  cookiesVal;
  isLoading = true;
  public displayedColumns = ['user_name', 'users_id', 'user_desc', 'action'];

  public dataSource = new MatTableDataSource<UsersAddModelList>();
 // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(public productService: DashboardService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService,
    private location:Location,
    ) {
        // redirect to home if not logged in
      if (!this.authenticationService.currentUserValue) {
        this.location.replaceState('/');
        this.router.navigate(['login']);
     }
    }

  ngOnInit() {
    this.cookiesVal = this.cookieService.get('cookiesVal');


    this.getAllUsers();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //Ongetuserdatas
 }
  public getAllUsers = () => {
    this.productService.Ongetuserdata()
    .subscribe(res => {
      this.isLoading = false;
      this.dataSource.data = res as UsersAddModelList[];

    })
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
