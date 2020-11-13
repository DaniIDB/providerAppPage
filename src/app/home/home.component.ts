import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public FlightArray;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8081/getFlightsForToday?").subscribe(data=>{
      this.FlightArray=data;
    });
  }

  public bringFligthsForToday(){
    
  }
}
