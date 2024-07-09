import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { authGuard } from './auth.guard';
export const routes: Routes = [{
    path: '',
    component: LoginComponent
},
{
    path: 'login',
    component: LoginComponent
}, {
    path: 'signup',
    component: SignupComponent 
}, {
    path: "navbar",
    component: NavbarComponent,canActivate :[authGuard]
}, {
    path: 'home',
    component: HomeComponent, canActivate :[authGuard]
}, {
    path: 'employee',
    component: EmployeeComponent, canActivate :[authGuard]
}

];
