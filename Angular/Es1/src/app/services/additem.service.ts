import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdditemService {
  items = ['item1', 'item2', 'item3', 'item4'];
  constructor() { }
  addItem(newItem: string) {
    this.items.push(newItem);
  }
}
