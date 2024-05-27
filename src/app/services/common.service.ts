import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  toggleSidebar = new EventEmitter<boolean>(); // Event emitter to toggle the show or hide sidebar value
  constructor() {}
}
