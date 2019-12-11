import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {DashboardService} from './services/dashboard.service';
import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatLineModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatPseudoCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
import { DashboardPageComponent } from './app-component/dashboard-page/dashboard-page.component';
import { ProductAddComponent } from './app-component/product-add/product-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductEditComponent } from './app-component/product-edit/product-edit.component';
import { UserAddComponent } from './app-component/user-add/user-add.component';
import { UserEditComponent } from './app-component/user-edit/user-edit.component';
import { ProductsListComponent } from './app-component/products-list/products-list.component';
import { UsersListComponent } from './app-component/users-list/users-list.component';
import { CookieService } from 'ngx-cookie-service';
import { CrmapiAddComponent } from './app-component/crmApi/crmapi-add/crmapi-add.component';
import { CrmapiListComponent } from './app-component/crmApi/crmapi-list/crmapi-list.component';
import { CrmapiEditComponent } from './app-component/crmApi/crmapi-edit/crmapi-edit.component';
import { LoginCrmComponent } from './app-component/login-crm/login-crm.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CallbackComponent,
    ProfileComponent,
    MainNavComponent,
    DashboardPageComponent,
    ProductAddComponent,
    ProductEditComponent,
    UserAddComponent,
    UserEditComponent,
    ProductsListComponent,
    UsersListComponent,
    CrmapiAddComponent,
    CrmapiListComponent,
    CrmapiEditComponent,
    LoginCrmComponent, 
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatLineModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPseudoCheckboxModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [DashboardService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
