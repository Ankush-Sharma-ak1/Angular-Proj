import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireAuth } from "angularfire2/auth";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//import { AngularFirestore } from "@angular/fire/firestore";

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeService } from './employees/employee.service';
import { EmployeeDisplayComponent } from './employees/employee-display/employee-display.component';
import { EmployeeDetailComponent } from './employees/employee-display/employee-detail/employee-detail.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth-guard.guard';
import { ConnectionServiceModule } from 'ng-connection-service';


const appRoutes: Routes = [
 {path: '', redirectTo: '/home', pathMatch: 'full'},
 {path: 'home', component: HomePageComponent, data: {animationState: 'home'}},
 {path: 'list', component: EmployeeListComponent, data: {animationState: 'list'}},
 {path: 'form', component: CreateEmployeeComponent, canActivate: [AuthGuard]},
 {path: 'login', component: LoginComponent},
 {path: 'emp/:id', component: EmployeeDetailComponent},
 {path: 'edit/:id', component: CreateEmployeeComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    EmployeeDisplayComponent,
    EmployeeDetailComponent,
    HeaderComponent,
    HomePageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ConnectionServiceModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
