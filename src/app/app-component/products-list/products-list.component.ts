import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { ProductsListsItem } from '../../model/productlist.model';
import {DashboardService} from '../../services/dashboard.service';
import { Location } from '@angular/common';
import { Router,ActivatedRoute } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';




@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent implements OnInit, AfterViewInit  {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  isLoading = true;
  cookiesVal;
  public displayedColumns = ['product_name', 'product_id', 'product_desc', 'action'];
  public dataSource = new MatTableDataSource<ProductsListsItem>();
 // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(public productService: DashboardService,private router: Router,
    private location:Location,
    private cookieService: CookieService,
    ) { }

  ngOnInit() {

    this.cookiesVal = this.cookieService.get('cookiesVal');

    
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
