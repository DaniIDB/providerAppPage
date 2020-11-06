import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-provider-login',
  templateUrl: './provider-login.component.html',
  styleUrls: ['./provider-login.component.css']
})
export class ProviderLoginComponent implements OnInit {

  public user;

  public error;

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.user=new FormGroup({
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  public onSubmit(){
    this.http.get("http://localhost:8081/getUserValues?UserName="+this.user.value.userName+"&Password="+this.user.value.password, {responseType: 'text'}).subscribe(error=>{
      if(error==='Error'){
        this.error=error;
      } else {
        this.navigate('provider-page');
      }
    });
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}
