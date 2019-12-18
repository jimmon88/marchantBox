import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { ProductsListsItem } from '../../model/productlist.model';
import {DashboardService} from '../../services/dashboard.service';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import {AuthenticationService} from '../../services/authentication.service';





@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, AfterViewInit  {

  color = 'primary';
  mode = 'determinate';
  currentUserVal;
  isLoading = true;
  toolbarVal;
  public displayedColumns = ['product_name', 'product_id', 'product_desc', 'action'];
  public dataSource = new MatTableDataSource<ProductsListsItem>();
 // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(
    public productService: DashboardService,
    private router: Router,
    private location:Location,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService

    ) {
      // redirect to home if not logged in
      if (!this.authenticationService.currentUserValue) {
        this.location.replaceState('/');
        this.router.navigate(['login']);
    }
    }


  ngOnInit() {

    this.toolbarVal = {icon:'', title:'Products-List',path:''};
    this.authenticationService.storeTitleval(this.toolbarVal);


    this.getAllProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

 }
  public getAllProducts = () => {
    this.productService.getProductData()
    .subscribe(res => {
      this.isLoading = false;
      this.dataSource.data = res as ProductsListsItem[];

    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
