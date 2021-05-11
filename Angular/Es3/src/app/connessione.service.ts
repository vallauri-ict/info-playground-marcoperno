import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnessioneService {

  private SERVER = "http://localhost:1337";

  constructor(private httpClient:HttpClient) { }

  public sendGetRequest(servizio: string){
    return this.httpClient.get(this.SERVER + servizio);
  }
}
