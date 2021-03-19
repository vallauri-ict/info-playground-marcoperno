import { Component } from "@angular/core";

@Component({
    selector:'app-dadi',
    templateUrl:'./dadi.component.html',
    styleUrls:['./dadi.component.css']
})

export class DadiComponent{
    dado1:number;
    dado2:number;
    pari:boolean =false;
    pathDado1:string = "assets/img/";
    pathDado2:string = "assets/img/";
    constructor(){
        this.dado1 = Math.floor(Math.random() * 6)+1;
        this.dado2 = Math.floor(Math.random() * 6)+1;
        //
        if(this.dado1==this.dado2)
            this.pari=true;
        else
            this.pari=false;
        //
        this.pathDado1 += this.dado1.toString() + '.png';
        this.pathDado2 += this.dado2.toString() + '.png';
    }
}