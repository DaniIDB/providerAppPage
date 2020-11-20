import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  public filterFlight;

  public flightArray;

  public destinationArray

  public dateValue: Date = new Date();

  constructor(private http: HttpClient) { 
    this.http.get("http://localhost:8081/getFlightsForToday?").subscribe(data=>{
      this.flightArray=data;
    });
  }

  ngOnInit(): void {
    this.filterFlight = new FormGroup({
      departure: new FormControl(''),
      arrival: new FormControl(''),
      datetimepicker: new FormControl('')
    })
  }

  public onSubmit() {
    console.log(this.filterFlight.value.datetimepicker);
  }
}
