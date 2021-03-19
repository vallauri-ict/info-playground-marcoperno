import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.alert('Salve Mondo');
  }

}
