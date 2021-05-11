import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyrndService {
//come per qualsiasi classe posso avere property e metodi
  //public (senza niente davanti) e private
  //N.B. in questo esempio non viene gestito OBSERVABLE
  private minValue:number;
  private maxValue:number;
  constructor() { 
    this.minValue=0;
    this.maxValue=10;
  }
  setValue(min:string,max:string){
    this.minValue=parseInt(min);
    this.maxValue=parseInt(max);
  }
  private genera():number{
    //N.B. solo per fare esempio di private
    var r:number;
    r=Math.floor(Math.random() * (this.maxValue-this.minValue+1))+this.minValue;
    return r;
  }
  rnd():number{
    return this.genera();
  }
}

