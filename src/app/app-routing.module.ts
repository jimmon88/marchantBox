import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardPageComponent } from './app-component/dashboard-page/dashboard-page.component';
import { ProductAddComponent } from './app-component/product-add/product-add.component';
import { ProductEditComponent } from './app-component/product-edit/product-edit.component';
import { UserAddComponent } from './app-component/user-add/user-add.component';
import { UserEditComponent } from './app-component/user-edit/user-edit.component';
import { ProductsListComponent } from './app-component/products-list/products-list.component';
import { UsersListComponent } from './app-component/users-list/users-list.component';
import { CrmapiAddComponent } from './app-component/crmApi/crmapi-add/crmapi-add.component';
import { CrmapiListComponent } from './app-component/crmApi/crmapi-list/crmapi-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginCrmComponent } from './app-component/login-crm/login-crm.component';


const routes: Routes = [
 {
    path: 'products',
    component: ProductsListComponent,
  },{
    path: 'dashboards',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
  },  
  {
    path: 'user-add',
    component: UserAddComponent,
  },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users-edit/:id',
    component: UserEditComponent,
  },
  {
    path: 'api-add',
    component: CrmapiAddComponent,
  },
  {
    path: 'api-list',
    component: CrmapiListComponent,
  },

  {
    path: '',
    component: NavbarComponent,
  },
  {
    path: 'login',
    component: LoginCrmComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [ProductListComponent]