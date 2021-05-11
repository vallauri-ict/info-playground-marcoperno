import { Component } from '@angular/core';
import { ConnessioneService } from './connessione.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Es3';

  constructor(private connessioneServer: ConnessioneService){}

  chiamaServer(){
    this.connessioneServer.sendGetRequest("/servizio1").subscribe(
      (data:any) =>{
        //DAL SERVER DEVE SEMPRE ARRIVARE UN DATO IN FORMATO JSON ALTRIMENTI NON ENTRA QUA MA IN ERROR
        alert(data);
      },
      (error:any)=>{
        /*
           status (codice di stato 0, 200, ...)
           url (contiene l'url della richiesta)
           message (contiene l'errore come stringa)
           error (contiene in text l'eventuale risposta del server)
        */
        alert(JSON.stringify(error));
      }
    );
  }

}
