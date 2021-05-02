import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


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


  constructor(
    public authService: AuthService
  ) {

   }

  ngOnInit(): void {

  }

}
