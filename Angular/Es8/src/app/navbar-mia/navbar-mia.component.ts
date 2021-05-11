import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from "../services/services.service"

@Component({
  selector: 'app-navbar-mia',
  templateUrl: './navbar-mia.component.html',
  styleUrls: ['./navbar-mia.component.css']
})
export class NavbarMiaComponent implements OnInit {

  @Input() arrayLogin: any;
  @Output() arrayLoginEvent: EventEmitter<any> = new EventEmitter()

  constructor(private service:ServicesService, private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  logout(){
    
    this.service.logout().subscribe(
      (data:any) =>{
        //DAL SERVER DEVE SEMPRE ARRIVARE UN DATO IN FORMATO JSON ALTRIMENTI NON ENTRA QUA MA IN ERROR
        this.arrayLoginEvent.emit(undefined)
      },
      (error:any)=>{
        
        alert(JSON.stringify(error));
      }
    );
  }

}
