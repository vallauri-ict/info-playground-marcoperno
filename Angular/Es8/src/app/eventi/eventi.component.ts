import { Component, OnInit,  ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import { EventiModel } from './eventi.model';
import { Router } from '@angular/router'; 
import { ServicesService } from "../services/services.service";
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent {

  eventi: EventiModel[] = [];
  eventsForCalendar = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.eventsForCalendar
  };

  async handleDateClick(arg) {
    this.eventi = await this.services.eventsShowByDate( arg.dateStr);
    
  }

  constructor(private router: Router, private services:ServicesService) {
    
  }

  async ngOnInit() {
    this.eventi = await this.services.eventsShowByUserId();
    for(let i=0;i<this.eventi.length;i++) {
      this.eventsForCalendar.push({title: this.eventi[i].name, date: this.eventi[i].date.toString().slice(0,10), _id: this.eventi[i]._id, backgroundColor: this.eventi[i].color})
    }
  }

  modifica($event, _id, name) {
    this.eventi[_id][name]=$event.srcElement.value;
    if(name=="color" || name=="name" || name=="date") {
      let i = 0;
      while(this.eventsForCalendar[i]._id != this.eventi[_id]._id && i < this.eventsForCalendar.length)
      {
        i++;
      }
      if(i!=this.eventsForCalendar.length && name=="color") {
        this.eventsForCalendar[i].backgroundColor = $event.srcElement.value;
      }
      else if(i!=this.eventsForCalendar.length && name=="name") {
        this.eventsForCalendar[i].title = $event.srcElement.value;
      }
      else if(i!=this.eventsForCalendar.length && name=="date") {
        this.eventsForCalendar[i].date = $event.srcElement.value;
      }
    }
  }

  async salva($event, i) {
    let eventoUpdated = await this.services.eventsUpdate(this.eventi[i]);
    alert(JSON.stringify(eventoUpdated));
  }
 
  async elimina($event, i) {
    let ris = await this.services.eventsDelete(this.eventi[i]._id);
    if(ris == true) {
      let index = 0;
      while(this.eventsForCalendar[index]._id != this.eventi[i]._id && index < this.eventsForCalendar.length)
      {
        index++;
      }
      if(index!=this.eventsForCalendar.length){
        this.eventsForCalendar.splice(index, 1);
      }
      this.eventi.splice(i, 1);
      alert("eliminato");
    } else {
      alert("errore nell'eliminazione")
    }
  }
  
}
