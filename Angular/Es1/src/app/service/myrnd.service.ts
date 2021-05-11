import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyrndService {
  private minValue:number;
  private maxValue:number;

  constructor() { 
    this.minValue = 0;
    this.maxValue = 10;
  }

  setValue(min:string, max:string){
    this.minValue = parseInt(min);
    this.maxValue = parseInt(max);
  }

  private genera():number {
    var r:number;
    r=Math.floor(Math.random()*(this.maxValue-this.minValue));
    return r;
  }

  rnd():number{
    return this.genera();
  }
}
