import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderLoginComponent } from './provider-login/provider-login.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProviderPageComponent } from './provider-page/provider-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: ProviderLoginComponent,
  },

  {
    path: 'provider-page',
    component: ProviderPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule, HttpClientModule, ReactiveFormsModule],
  exports: [RouterModule],
  declarations: [
    ProviderLoginComponent,
    ProviderPageComponent,
  ],
})
export class AppRoutingModule { }
