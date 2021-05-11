import { Injectable } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { LibriModel } from '../libri-con-servizio/libri.model';

@Injectable({
  providedIn: 'root'
})
export class LibriService {
  libri: LibriModel[] = [];
  libro: LibriModel;
  constructor(private dataStorageService:DataStorageService) { }

  getLibri() {
    this.dataStorageService.sendGetRequest('books')
    .subscribe(
      (data: any[]) => {
        console.log(data);
        this.libri = data;
      },
      (error: any) => {
        console.log(error);
        window.alert("ERRORE: " + error);
      }
    )
  } 
  getLibro(id:string) {
    this.dataStorageService.sendGetRequest('books/'+id).subscribe(
      (data: any) => {
        console.log(data);
        this.libro = data;
      },
      (error: any) => {
        console.log(error);
        window.alert("ERRORE: " + error);
      }
    )
  }
  deleteLibro(id:string) {
    this.dataStorageService.sendDeleteRequest('books/'+id).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
        window.alert("ERRORE: " + error);
      }
    )
  }
  putLibro(id:string, body:any) {
    this.dataStorageService.sendPutRequest('books/'+id,body).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
        window.alert("ERRORE: " + error);
      }
    )
  }
  postLibro(body:any) {
    this.dataStorageService.sendPostRequest('books/',body).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
        window.alert("ERRORE: " + error);
      }
    )
  }
}
