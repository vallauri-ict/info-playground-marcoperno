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
  
  async ngOnInit(){
    if(await this.services.login({}))
      this.router.navigateByUrl('/eventi');
  }

  async login(){
    
    let obj = {};
    obj["email"] = this.login_username;
    obj["pwd"] = this.login_password;
    if( await this.services.login(obj) == true) {
      this.router.navigateByUrl('/eventi');
    }
    else {
      alert("Errore nel logim")
    }
  }

  

}
