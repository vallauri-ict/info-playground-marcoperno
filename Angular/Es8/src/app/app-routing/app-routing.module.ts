import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventiComponent } from '../eventi/eventi.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule, Routes  } from '@angular/router';



const appRoutes: Routes = [ 
  { path: 'eventi', component: EventiComponent }, 
  { path: 'login',  component: LoginComponent },
];
@NgModule({ 
  imports: [ 
    RouterModule.forRoot( 
      appRoutes,
      
    ) // other imports here 
  ], 
}) 
export class AppRoutingModule { }
