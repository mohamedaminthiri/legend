import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import * as moment from 'moment';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ValidateService } from './services/validate.service';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EnterdocComponent } from './enterdoc/enterdoc.component';
import { RecentComponent } from './recent/recent.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { MetricsComponent } from './metrics/metrics.component';
import { LoadfileComponent } from './loadfile/loadfile.component';
import { SectionsComponent } from './sections/sections.component';
import { UsersComponent } from './users/users.component';
import { RefreshComponent } from './refresh/refresh.component';
import { PrintissuesComponent } from './printissues/printissues.component';
import { PicksectionComponent } from './picksection/picksection.component';
import { PrintComponent } from './print/print.component';  
import { OnlineComponent } from './online/online.component';
import { OnlineIssueConfigComponent } from './online-issue-config/online-issue-config.component';
import { ConfigComponent } from './config/config.component';
import { EnternewsComponent } from './enternews/enternews.component';
import { EnterletterComponent } from './enterletter/enterletter.component';
import { EnteradvertComponent } from './enteradvert/enteradvert.component';
import { EditorsComponent } from './editors/editors.component';
import { CodesComponent } from './codes/codes.component';
import { PrintConfigComponent } from './print-config/print-config.component';
import { EtocComponent } from './etoc/etoc.component';  

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent, canActivate:[AuthGuard]},
  //{path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'refresh', component: RefreshComponent},
  {path: 'picksection', component: PicksectionComponent, canActivate:[AuthGuard]},
  {path: 'enterdoc', component: EnterdocComponent, canActivate:[AuthGuard]},
  {path: 'enternews', component: EnternewsComponent, canActivate:[AuthGuard]},
  {path: 'loadfile', component: LoadfileComponent, canActivate:[AuthGuard]},
  {path: 'recent', component: RecentComponent, canActivate:[AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate:[AuthGuard]},
  {path: 'online', component: OnlineComponent, canActivate:[AuthGuard]},
  {path: 'print', component: PrintComponent, canActivate:[AuthGuard]},
  {path: 'etoc', component: EtocComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'metrics', component: MetricsComponent, canActivate:[AuthGuard]},
  {path: 'sections', component: SectionsComponent, canActivate:[AuthGuard]},
  {path: 'editors', component: EditorsComponent, canActivate:[AuthGuard]},
  {path: 'codes', component: CodesComponent, canActivate:[AuthGuard]},
  {path: 'config', component: ConfigComponent, canActivate:[AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate:[AuthGuard]},
  {path: 'printissues', component: PrintissuesComponent, canActivate:[AuthGuard]},
  {path: 'online-issue-config', component: OnlineIssueConfigComponent, canActivate:[AuthGuard]},
  {path: 'print-config', component: PrintConfigComponent, canActivate:[AuthGuard]},
  {path: 'enterdoc/:section', component: EnterdocComponent, canActivate:[AuthGuard]},
  {path: 'details/:doc', component: DetailsComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    EnterdocComponent,
    RecentComponent,
    DetailsComponent,
    SearchComponent,
    SearchresultsComponent,
    LayoutComponent,
    AdminComponent,
    MetricsComponent,
    LoadfileComponent,
    SectionsComponent,
    UsersComponent,
    RefreshComponent,
    PrintissuesComponent,
    PicksectionComponent,
    PrintComponent,
    OnlineComponent,
    OnlineIssueConfigComponent,
    ConfigComponent,
    EnternewsComponent,
    EnterletterComponent,
    EnteradvertComponent,
    EditorsComponent,
    CodesComponent,
    PrintConfigComponent,
    EtocComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    //RouterModule.forRoot(appRoutes)   
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'top'
    })   
  ],
  providers: [ValidateService, AuthService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
