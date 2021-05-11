import { Injectable } from '@angular/core';
import { DatastorageService } from './datastorage.service';
import { LibriModel } from "../libri-con-servizio/libri.model"

@Injectable({
  providedIn: 'root'
})
export class LibriService {
  libri: LibriModel[]=[];
  libro: LibriModel;
  constructor(private DatastorageService:DatastorageService) { }

  getLibri() {
    this.DatastorageService.sendGetRequest("books")
    .subscribe(
      (data: any[]) => {
        console.log(data);
        this.libri = data;
      },
      (error: any) => {
        console.log("Errore");
        window.alert("Errore: "+ error);
      }
    )
  }
}
