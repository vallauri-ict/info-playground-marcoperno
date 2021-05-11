import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule  } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module'; 

import  {HttpClientModule} from '@angular/common/http';
import { FormsModule } from "@angular/forms"
import { LoginComponent } from './login/login.component';
import { NavbarMiaComponent } from './navbar-mia/navbar-mia.component';
import { EventiComponent } from './eventi/eventi.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarMiaComponent,
    EventiComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'eventi', component: EventiComponent } 
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


