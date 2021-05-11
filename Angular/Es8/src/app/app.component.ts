import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router'; 
import { RouterModule, Routes} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Es8';
  loggato:boolean = false;
  loggatoOra:boolean = false;
  arrayLogin: any;
  arrayLoginEvent: any;
  constructor(private router: Router) {
    if(this.loggato==true)
      this.router.navigateByUrl('/eventi');
  }
  loggatoChanged(logg: boolean) {
    console.log("ss")
    this.loggato = logg;
  }
  arrayLoginChanged(_arrayLogin: any) {
    console.log("ss")
    this.arrayLogin = _arrayLogin;
  }

}


