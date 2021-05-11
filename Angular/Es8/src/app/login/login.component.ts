import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ServicesService } from "../services/services.service"
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() arrayLogin: any;
  @Output() arrayLoginEvent: EventEmitter<any> = new EventEmitter()
  login_username: string;
  login_password: string;
  register_name: string;
  register_email: string;
  register_password: string;
  constructor(private services:ServicesService, private router: Router) { 
    
  }

  login(){
    
    let obj = {};
    obj["email"] = this.login_username;
    obj["pwd"] = this.login_password;
    this.services.login(obj).subscribe(
      (data:any) =>{
        //DAL SERVER DEVE SEMPRE ARRIVARE UN DATO IN FORMATO JSON ALTRIMENTI NON ENTRA QUA MA IN ERROR
        this.arrayLoginEvent.emit(data);
        //this.loggatoOra.emit(true)
      },
      (error:any)=>{
        
        alert(JSON.stringify(error));
      }
    );
  }

}
