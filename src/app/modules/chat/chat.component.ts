import { Component, OnInit } from '@angular/core';
import { User } from '@core/interfaces/user';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-chat',
  template: '<router-outlet></router-outlet>',
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
