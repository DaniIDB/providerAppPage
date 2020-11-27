import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthenticationService } from "../autentification/authentication.service";

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.css']
})
export class ProviderPageComponent implements OnInit {

  public destinationForm;

  public modifyDestinationForm;

  public errorDestination;

  public destinationsArray;

  public destinationId;

  public user : String;

  constructor(private http : HttpClient, public router:Router, private authentication: AuthenticationService) {
    console.log(this.router.url);
    this.user = JSON.parse(localStorage.getItem('currentUser')).userName;
   }

  ngOnInit(): void {
  }

  public logOut(){
    this.authentication.logout();
  }
}
