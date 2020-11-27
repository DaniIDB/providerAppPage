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

  public createFlight;

  public flightArray;

  public destinationArray;

  public createError;

  public editFlight;

  public editError;

  constructor(private http: HttpClient) {
    this.http.get("http://localhost:8081/getFlightsForToday?").subscribe(data => {
      this.flightArray = data;
    });
    this.http.get("http://localhost:8081/getDestination?").subscribe(data => {
      this.destinationArray = data;
      console.log(this.destinationArray);
    });
  }

  ngOnInit(): void {
    this.filterFlight = new FormGroup({
      departure: new FormControl(''),
      arrival: new FormControl(''),
      datetimepicker: new FormControl('')
    })

    this.createFlight = new FormGroup({
      departure: new FormControl(''),
      arrival: new FormControl(''),
      datetimepicker: new FormControl('')
    })

    this.editFlight = new FormGroup({
      departure: new FormControl(''),
      arrival: new FormControl(''),
      datetimepicker: new FormControl('')
    })
  }

  public onSubmit() {
    this.http.get("http://localhost:8081/prueba?name=" + JSON.stringify(this.filterFlight.value.datetimepicker)).subscribe(data => {
      this.flightArray = data;
    });
  }

  public create() {
    var departure = this.createFlight.value.departure;
    var arrival = this.createFlight.value.arrival;
    var user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.createFlight.value.datetimepicker);
    if (this.createFlight.value.datetimepicker != null && this.createFlight.value.datetimepicker.length != 0) {
      var date = new Date(this.createFlight.value.datetimepicker);
      this.http.get("http://localhost:8081/createnewflights?departure=" + departure + "&arrival=" + arrival + "&date=" + date.toISOString() + "&user=" + user.userName).subscribe(data => {
        this.filter();
        this.createError = null;
      },
        (error) => {
          this.createError = error;
        });
    } else {
      console.log("asdasasda");
      this.createError = "Invalid date";
    }

  }

  public filter() {
    var departure = this.filterFlight.value.departure;
    var arrival = this.filterFlight.value.arrival;
    console.log(this.filterFlight.value.datetimepicker);
    if (this.filterFlight.value.datetimepicker != null && this.filterFlight.value.datetimepicker.length != 0) {
      var date = new Date(this.filterFlight.value.datetimepicker);
      this.http.get("http://localhost:8081/filterflights?departure=" + departure + "&arrival=" + arrival + "&date=" + date.toISOString()).subscribe(data => {
        this.flightArray = data;
      });
    } else {
      this.http.get("http://localhost:8081/filterflights?departure=" + departure + "&arrival=" + arrival + "&date=" + "").subscribe(data => {
        this.flightArray = data;
      });
    }
  }

  public edit(flight) {
    var departure = this.editFlight.value.departure;
    var arrival = this.editFlight.value.arrival;
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var id = flight.id;
    if (this.editFlight.value.datetimepicker != null && this.editFlight.value.datetimepicker.length != 0) {
      var date = new Date(this.editFlight.value.datetimepicker);
      this.http.get("http://localhost:8081/editflight?departure=" + departure + "&arrival=" + arrival + "&date=" + date.toISOString() + "&user=" + user.userName + "&id=" + id).subscribe(data => {
        flight.departure = departure;
        flight.arrival = arrival;
        flight.date = this.editFlight.value.datetimepicker;
        flight.user = user;
      },
        (error) => {
          this.editError = error;
        });
    } else {
      this.editError = "Invalid date";
    }

  }

  public delete(flight) {

  }
}
