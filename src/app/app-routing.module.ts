import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderLoginComponent } from './provider-login/provider-login.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './autentification/auth.guard';
import { ProviderPageComponent } from './provider-page/provider-page.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FlightsComponent } from './flights/flights.component';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ProviderPageComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'flights', component: FlightsComponent}
    ]
  },
  {
    path: 'login',
    component: ProviderLoginComponent,
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule, HttpClientModule, ReactiveFormsModule, DateTimePickerModule, DatePickerModule],
  exports: [RouterModule],
  declarations: [
    ProviderLoginComponent,
    ProviderPageComponent,
    HomeComponent,
    FlightsComponent,
  ],
})
export class AppRoutingModule { }
