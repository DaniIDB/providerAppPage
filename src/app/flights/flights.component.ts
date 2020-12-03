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

  public changeFlight;

  public destination;

  public errorDestination;

  public deleteDestinationArray;

  public errorDeleteDestination;

  public selectedFlight = {
    "id": 1,
    "departure": "",
    "arrival": "Spain",
    "date": 34,
    "user": ""
  };

  constructor(private http: HttpClient) {
    this.http.get("http://localhost:8081/getFlights?").subscribe(data => {
      this.flightArray = data;
    });
    this.http.get("http://localhost:8081/getDestination?").subscribe(data => {
      this.destinationArray = data;
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

    this.destination = new FormGroup({
      name: new FormControl('')
    })

    this.deleteDestinationArray = new FormGroup({
      name: new FormControl('')
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
    if (this.createFlight.value.datetimepicker != null && this.createFlight.value.datetimepicker.length != 0) {
      var date = new Date(this.createFlight.value.datetimepicker);
      this.http.get("http://localhost:8081/createnewflights?departure=" + departure + "&arrival=" + arrival + "&date=" + date.toISOString() + "&user=" + user.userName).subscribe(data => {
        this.filter();
        this.createError = null;

        var x = document.getElementById("snackbarCreated");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      },
        (error) => {
          this.createError = error.error.error;
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

  public edit() {
    var departure = this.editFlight.value.departure;
    var arrival = this.editFlight.value.arrival;
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var id = this.changeFlight.id;
    if (this.editFlight.value.datetimepicker != null && this.editFlight.value.datetimepicker.length != 0) {
      var date = new Date(this.editFlight.value.datetimepicker);
      this.http.get("http://localhost:8081/editflight?departure=" + departure + "&arrival=" + arrival + "&date=" + date.toISOString() + "&user=" + user.userName + "&id=" + id).subscribe(data => {
        this.changeFlight.departure = departure;
        this.changeFlight.arrival = arrival;
        this.changeFlight.date = this.editFlight.value.datetimepicker;
        this.changeFlight.user = user;
        this.editError = null;

        var x = document.getElementById("snackbarEdited");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      },
        (error) => {
          console.log(error);
          this.editError = error.error.error;
        });
    } else {
      this.editError = "Invalid date";
    }
  }

  public setFlight(flight) {
    this.selectedFlight.departure = flight.departure;
    this.selectedFlight.arrival = flight.arrival;
    this.selectedFlight.date = flight.date;

    this.changeFlight = flight;
  }

  public delete() {
    this.http.get("http://localhost:8081/deleteflight?id=" + this.changeFlight.id).subscribe(data => {
      this.filter();
      var x = document.getElementById("snackbarDeleted");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    });

  }

  public newDestination() {
    this.http.get("http://localhost:8081/newdestination?name=" + this.destination.value.name).subscribe(data => {
      this.destinationArray.push(data);
      this.errorDestination = null;
      var x = document.getElementById("snackbarCreated");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    },
      (error) => {
        this.errorDestination = error.error.error;
      });
  }

  public deleteDestination() {

    this.http.get("http://localhost:8081/deletedestination?name=" + this.deleteDestinationArray.value.name.destination + "&id=" + this.deleteDestinationArray.value.name.id).subscribe(data => {
      this.http.get("http://localhost:8081/getDestination?").subscribe(data => {
        this.destinationArray = data;
        this.errorDeleteDestination = null;
        var x = document.getElementById("snackbarDeleted");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      });
    },
      (error) => {
        this.errorDeleteDestination = error.error.error;
      });
  }
}
