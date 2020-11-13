import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from "../autentification/authentication.service";

@Component({
  selector: 'app-provider-login',
  templateUrl: './provider-login.component.html',
  styleUrls: ['./provider-login.component.css']
})
export class ProviderLoginComponent implements OnInit {

  public user;

  public error;

  constructor(public http: HttpClient, private router: Router, private authentication: AuthenticationService) { 
    if (this.authentication.currentUserValue) { 
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.user = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  public onSubmit() {
    console.log(this.authentication.login(this.user.value.userName, this.user.value.password).subscribe(
      data => {
        const currentUser = this.authentication.currentUserValue;
        if (currentUser) {
          this.router.navigate([data.returnUrl]);
        } else {
          this.error="Error";
        }
      }
    ));
  }
}
