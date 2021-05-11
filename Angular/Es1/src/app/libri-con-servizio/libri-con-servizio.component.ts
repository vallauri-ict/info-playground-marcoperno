import { Component, OnInit } from '@angular/core';
import { LibriService } from '../services/libri.service';
import { LibriModel } from './libri.model';

@Component({
  selector: 'app-libri-con-servizio',
  templateUrl: './libri-con-servizio.component.html',
  styleUrls: ['./libri-con-servizio.component.css']
})
export class LibriConServizioComponent implements OnInit {

  constructor(public libriService:LibriService) { }
  btnClick(id:string){
    //se effettuo soltanto la copia del json ricevuto, non viene fatto in
    //automatico il cast, ma occorre fare la new dell'oggetto
    var l:LibriModel=new LibriModel(this.libriService.libri[id].id,this.libriService.libri[id].author,this.libriService.libri[id].country,this.libriService.libri[id].pages,this.libriService.libri[id].title,this.libriService.libri[id].year);
    alert(l.show());
    //leggo il libro in base all' id
    this.libriService.getLibro(id);
    window.alert("Hai selezionato id="+id);
    window.alert(this.libriService.libro.author);
  }
  btnModificaClick(libro:LibriModel){
    var l={
      "id": libro.id,
      "author": libro.author + "MODIFICATO",
      "country": libro.country,
      "pages": libro.pages,
      "title": libro.title,
      "year": libro.year
    };
    this.libriService.putLibro(libro.id,l);
    this.libriService.getLibri();
  }
  btnCancellaClick(id:string){
    this.libriService.deleteLibro(id);
    this.libriService.getLibri();
  }
  btnInserisciClick(){
    var l={
      "id": "",
      "author": "Germano",
      "country": "Italy",
      "pages": 777,
      "title": "myAngular",
      "year": 2021
    };
    this.libriService.postLibro(l);
    this.libriService.getLibri();
  }
  ngOnInit(): void {
    //se istanziamo il model, il metodo show funziona
    var l:LibriModel=new LibriModel("77","Pippo","Italy","12","Prova","2021");
    alert(l.show());
    this.libriService.getLibri();
  }

}
