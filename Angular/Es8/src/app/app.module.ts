import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { RouterModule  } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 

import  {HttpClientModule} from '@angular/common/http';
import { FormsModule } from "@angular/forms"
import { LoginComponent } from './login/login.component';
import { NavbarMiaComponent } from './navbar-mia/navbar-mia.component';
import { EventiComponent } from './eventi/eventi.component';
import { HomeComponent } from './home/home.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarMiaComponent,
    EventiComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FullCalendarModule, // register FullCalendar with you app
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


