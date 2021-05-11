import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private SERVER = "http://localhost:3000";

  constructor(private httpClient:HttpClient) { }

  public login(obj){
    const httpOptions =  {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      withCredentials: true
    } 
    return this.httpClient.post(this.SERVER + "/login", JSON.stringify( obj), httpOptions);
  }

  public logout(){
    return this.httpClient.get(this.SERVER + "/logout", {withCredentials:true});
  }
}
