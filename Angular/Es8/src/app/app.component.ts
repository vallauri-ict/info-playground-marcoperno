import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router'; 
import { RouterModule, Routes} from '@angular/router';
import { ServicesService } from "./services/services.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Es8';
  
  constructor(private router: Router, public services:ServicesService) {
    
  }
  async logout(){
    if( await this.services.logout() == true) {
      this.router.navigateByUrl('/login');
    }
    else {
      alert("Errore nel logout")
    }
  }

}


