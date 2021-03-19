import { Component, OnInit } from '@angular/core';
import { books } from 'src/assets/dati/books'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  libri:any = books; //creo array di libri
  visPag:boolean = false; //usata per visualizzare/nascondere colonna Pages
  constructor() { 
    this.visPag = false;
  }

  ngOnInit(): void {
  }

}
