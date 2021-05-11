import { Component, OnInit } from '@angular/core';
import { AdditemService } from '../services/additem.service';


@Component({
  selector: 'app-output-servizio',
  templateUrl: './output-servizio.component.html',
  styleUrls: ['./output-servizio.component.css']
})
export class OutputServizioComponent implements OnInit {

  constructor(public addItemService:AdditemService) {
      //N.B. la proprietà item del servizio è la stessa del servizio
      //iniettato nel componente output-serviziochild
      //in ogni componente non viene fatta una nuova istanza, ma è sempre la stessa
   }

  ngOnInit(): void {
  }

}
