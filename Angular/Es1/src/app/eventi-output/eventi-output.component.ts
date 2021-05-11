import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventi-output',
  templateUrl: './eventi-output.component.html',
  styleUrls: ['./eventi-output.component.css']
})

export class EventiOutputComponent implements OnInit {

  items = ['item1', 'item2', 'item3', 'item4'];

  addItem(newItem: string) {
    this.items.push(newItem);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
