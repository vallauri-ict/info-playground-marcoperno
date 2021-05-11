import { Component, OnInit } from '@angular/core';
import { MyrndService } from '../service/myrnd.service';

@Component({
  selector: 'app-use-service',
  templateUrl: './use-service.component.html',
  styleUrls: ['./use-service.component.css']
})
export class UseServiceComponent implements OnInit {
  da:string;
  a:string;
  numero:number;
  constructor(private myrndService:MyrndService) { 
    this.da = (1).toString();
    this.a = (10).toString();
  }

  btnClick(){
    this.myrndService.setValue(this.da, this.a)
    this.numero = this.myrndService.rnd();
  }

  ngOnInit(): void {
  }

}
