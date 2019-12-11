import { Component, OnInit, AfterViewInit,ViewChild} from '@angular/core';
import { UsersAddModelList } from '../../model/userlist.model';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {DashboardService} from '../../services/dashboard.service';
import { Location } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router,ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {

  cookiesVal;
  isLoading = true;
  public displayedColumns = ['user_name', 'users_id', 'user_desc', 'action'];

  public dataSource = new MatTableDataSource<UsersAddModelList>();
 // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(public productService: DashboardService,private router: Router,
    private cookieService: CookieService,
    private location:Location,
    public auth: AuthService) { }

  ngOnInit() {
    this.cookiesVal = this.cookieService.get('cookiesVal');

      if (!this.cookiesVal) {
        this.location.replaceState('/');
        this.router.navigate(['/']); 
      }
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
