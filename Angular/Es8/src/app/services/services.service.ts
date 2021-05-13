import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private SERVER = "http://localhost:3000";
  public arrayLogin:any;
  public name: any = undefined;

  constructor(private httpClient:HttpClient) { }

  public async login(obj): Promise<boolean> {
    const httpOptions =  {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      withCredentials: true
    } 
    try {
      let data = await this.httpClient.post(this.SERVER + "/login", JSON.stringify( obj), httpOptions).toPromise();
      this.name = data["name"];
      return true;
    } catch (error) {
      return false;
    }
    
  }

  public async logout(): Promise<boolean>{
    let data = await this.httpClient.get(this.SERVER + "/logout", {withCredentials:true}).toPromise();
    this.name = undefined;
    return true;
  }

  public async eventsShowByUserId(): Promise<any>{
    let data = await this.httpClient.get(this.SERVER + "/events/show/userId", {withCredentials:true}).toPromise();
    return data;
  }

  public async eventsShowByDate(date): Promise<any>{
    let data = await this.httpClient.get(this.SERVER + "/events/show/date/"+date, {withCredentials:true}).toPromise();
    return data;
  }

  public async eventsUpdate(obj): Promise<any>{
    const httpOptions =  {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      withCredentials: true
    } 
    try {
      let data = await this.httpClient.put(this.SERVER + "/events/"+obj._id, JSON.stringify( obj), httpOptions).toPromise();
      return data;
    } catch (error) {
      return {};
    }
  }

  public async eventsDelete(_id): Promise<any>{
    try {
      let data = await this.httpClient.delete(this.SERVER + "/events/"+_id, {withCredentials:true}).toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }

  public getIsAuthenticated(): boolean {
    return this.arrayLogin;
  }
}
