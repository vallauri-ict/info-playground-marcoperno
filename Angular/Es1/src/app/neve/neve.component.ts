import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-neve',
  templateUrl: './neve.component.html',
  styleUrls: ['./neve.component.css']
})
export class NeveComponent implements OnInit {

  dati=[
    {nome: 'Artesina',altezza:'101'},
    {nome: 'Limone',altezza:'77'},
    {nome: 'Argentera',altezza:'125'}
  ];

  constructor() { 
    for(let i=0;i<this.dati.length;i++)
    {
      this.dati[i].altezza = (Math.round(Math.random()*210*100)/100).toString();
    }
  }

  ngOnInit(): void {
  }

}
