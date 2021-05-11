import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  //https://angular.io/guide/inputs-outputs
  lancio:number;

  constructor() { }
  btnClick(){
    this.lancio = Math.floor(Math.random() * 6)+1;
  }
  ngOnInit(): void {
  }

}
