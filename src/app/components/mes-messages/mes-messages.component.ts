import { Component, OnInit } from '@angular/core';
import { PusherService } from 'src/app/shared/services/pusher.service';

interface Message {
  text: string;
  user: string;
}

@Component({
  selector: 'app-mes-messages',
  templateUrl: './mes-messages.component.html',
  styleUrls: ['./mes-messages.component.css']
})
export class MesMessagesComponent implements OnInit {

  messages: Array<Message>;
  userName: string;
  messageText: string;

  constructor(
    private pusherService: PusherService
  ) {
    this.messages = [];
   }

  ngOnInit(): void {
    this.pusherService.messagesChannel.bind('client-new-message', (message) => {
      this.messages.push(message);
    });
  }

  sendMessage(user: string, text: string) {
    const message: Message = {
       user: user,
       text: text,
    }
    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.messages.push(message);
  }

}
