import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit {

  //N.B. mettere in app.module.ts FormsModule e name nei controlli
  //[(ngModel)] bidirezionale
  //[value] unidirezionale
  nome:string = ""; //serve per leggere il valore di txtNome
  textChanged:string = ""; //serve per scrivere in txtTextChanged
  pathImg1:string = "assets/img/Mario1.png";
  pathImg2:string = "assets/img/Mario2.png";
  pathImg3:string = "assets/img/raspberry.png";
  nomeImmagine:string;
  pathImg:string = "assets/img/vuota.png";
  
  constructor() { }

  btnClick(){
    window.alert("Salve Mondo");
  }
  txtNomeTextChanged() {
    this.textChanged=this.nome;
  }
  onMouseOver(nomeImg:string, pathImm:string){
    this.nomeImmagine=nomeImg;
    this.pathImg=pathImm;
  }
  onMouseOut() {
    this.nomeImmagine="";
    this.pathImg="assets/img/vuota.png";
  }
  ngOnInit(): void {
  }

}
