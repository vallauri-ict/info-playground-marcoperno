import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'pippo';
  author:string = "Pluto";
  numero:number = Math.floor(Math.random()*100);
}
