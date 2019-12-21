import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { DashboardService } from "../../../services/dashboard.service";
import { Location } from "@angular/common";
import { CrmapiListsItem } from "../../../model/apilist.model";
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  Sort
} from "@angular/material";
import { AuthenticationService } from "../../../services/authentication.service";
import { CrmapiAddComponent } from "../crmapi-add-modal/crmapi-add.component";
import { NotificationService } from "src/app/core/notification.service";
import { ApplicationStateService } from "src/app/services/application-state.service";
import { CrmapiService } from "src/app/services/crmapi.service";
import { catchError } from "rxjs/operators";
import { HttpError } from "src/app/model/http-error.model";
import { Api } from "src/app/model/api.model";
import { Config } from "src/app/core/config";
import { AlertConfirmModalComponent } from "src/app/core/components/alert-confirm-modal/alert-confirm-modal.component";

@Component({
  selector: "app-crmapi-list",
  templateUrl: "./crmapi-list.component.html",
  styleUrls: ["./crmapi-list.component.scss"]
})
export class CrmapiListComponent implements OnInit {
  isLoading = false;
  overlay = false;
  cookiesVal;
  sortedData: CrmapiListsItem[];
  api = {};
  pageSize: number = 5;
  array: CrmapiListsItem[] = [];
  public currentPage = 0;
  public totalSize = 0;

  public displayedColumns = [
    "crm_label",
    "crm_apiUsername",
    "crm_apiPassword",
    "crm_apiType",
    "active",
    "action"
  ];
  public dataSource = new MatTableDataSource<CrmapiListsItem>();
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private location: Location,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notification: NotificationService,
    private crmapiService: CrmapiService,
    private ApplicationStateService: ApplicationStateService
  ) {
    // // redirect to home if not logged in
    // if (!this.authenticationService.currentUserValue) {
    //   this.location.replaceState('/');
    //   this.router.navigate(['login']);
    // }
    this.sortedData = this.array.slice();
  }

  ngOnInit() {
    this.pageSize = Config.PAGE_SIZE;
    Config.APILIST.forEach(item => {
      this.api[item.value] = item.viewValue;
    });

    this.getAllCRMapis();
    this.ApplicationStateService.onCrmAPItState().subscribe(() => {
      this.getAllCRMapis();
    });
  }

  public getAllCRMapis = () => {
    this.isLoading = true;
    this.crmapiService.getCrmapi().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<CrmapiListsItem>(res.data);
        this.dataSource.paginator = this.paginator;
        this.array = res.data;
        this.sortedData = this.dataSource.data.slice();
        this.iterator();
        this.isLoading = false;
      },
      error => {
        this.notification.error(error.message);
        this.dataSource = new MatTableDataSource<CrmapiListsItem>([]);
        this.dataSource.paginator = this.paginator;
        this.array = [];
        this.sortedData = this.dataSource.data.slice();
        this.iterator();
        this.isLoading = false;
      }
    );
  };

  openDialog(): void {
    let dialogRef = this.dialog.open(CrmapiAddComponent, {
      width: "500px",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      //this.animal = result;
    });
  }
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "crm_label":
          return compare(a.crm_label, b.crm_label, isAsc);
        case "crm_apiUsername":
          return compare(a.crm_apiUsername, b.crm_apiUsername, isAsc);
        case "crm_apiPassword":
          return compare(a.crm_apiPassword, b.crm_apiPassword, isAsc);
        case "crm_apiType":
          return compare(a.crm_apiType, b.crm_apiType, isAsc);
        case "crm_apiEndpoint":
          return compare(a.crm_apiEndpoint, b.crm_apiEndpoint, isAsc);
        default:
          return 0;
      }
    });
  }

  activateApi(event, data) {
    this.crmapiService.activateCrmapi(data.id, event.checked).subscribe(
      res => {
        event.checked
          ? this.notification.success(
              "API '" + data.crm_label + "' activated successfully"
            )
          : this.notification.success(
              "API '" + data.crm_label + "' deactivated successfully"
            );
      },
      error => {
        this.notification.error(error.message);
      }
    );
  }
  editCrm(data) {
    let dialogRef = this.dialog.open(CrmapiAddComponent, {
      width: "500px",
      data: data
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = new MatTableDataSource<CrmapiListsItem>(part);
  }
  deleteCrm(data) {
    let alertdialogRef = this.dialog.open(AlertConfirmModalComponent, {
      width: "500px",
      data: { message: "are you sure want to deele" }
    });
    let _this = this;
    alertdialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log(data);
      if (result) {
        _this.crmapiService.deleteCrmApi(data.id).subscribe(
          res => {
            _this.notification.success(
              "API '" + data.crm_label + "' deleted successfully"
            );
          },
          error => {
            _this.notification.error(error.message);
          }
        );
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
