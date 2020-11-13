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

  constructor(private http : HttpClient, private router:Router, private authentication: AuthenticationService) {
   }

  ngOnInit(): void {
  }

  public logOut(){
    this.authentication.logout();
  }
}
