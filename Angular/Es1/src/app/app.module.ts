import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DadiComponent } from './dadi/dadi.component';
import { NeveComponent } from './neve/neve.component';
import { BooksComponent } from './books/books.component';
import { EventiComponent } from './eventi/eventi.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { InputChildComponent } from './input/input-child/input-child.component';
import { EventiOutputComponent } from './eventi-output/eventi-output.component';
import { EventiOutputItemComponent } from './eventi-output/eventi-output-item/eventi-output-item.component';
import { UsoServiceComponent } from './uso-service/uso-service.component';
import { OutputServizioComponent } from './output-servizio/output-servizio.component';
import { OutputServiziochildComponent } from './output-servizio/output-serviziochild/output-serviziochild.component';
import { LibriConServizioComponent } from './libri-con-servizio/libri-con-servizio.component';

@NgModule({
  declarations: [
    AppComponent,
    DadiComponent,
    NeveComponent,
    BooksComponent,
    EventiComponent,
    InputComponent,
    InputChildComponent,
    EventiOutputComponent,
    EventiOutputItemComponent,
    UsoServiceComponent,
    OutputServizioComponent,
    OutputServiziochildComponent,
    LibriConServizioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
