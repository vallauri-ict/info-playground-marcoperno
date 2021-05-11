import { Component, OnInit } from '@angular/core';
import { AdditemService } from 'src/app/services/additem.service';

@Component({
  selector: 'app-output-serviziochild',
  templateUrl: './output-serviziochild.component.html',
  styleUrls: ['./output-serviziochild.component.css']
})
export class OutputServiziochildComponent implements OnInit {
  newItem:string;
  constructor(public addItemService:AdditemService) { 

  }
  addNewItem(){
    this.addItemService.addItem(this.newItem);
  }
  ngOnInit(): void {
  }

}
