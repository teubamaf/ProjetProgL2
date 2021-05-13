import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Chats from 'src/app/shared/models/chats.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  id: string;
  myArray: any[] = [];
  tab: any[] = [];
  items: any[] = [];
  tabDate: any[] = [];
  tab2: any[] = [];

  chat: Chats = new Chats();

  uid = this.authService.userData.uid;
  currentDate = Date.now();
  date: string;

  messages: any;
  itemUsers: Observable<any[]>;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public authService: AuthService,
    public chatService: ChatService,
    public datePipe: DatePipe
  ) {
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.date = this.datePipe.transform(this.currentDate, 'd/MM/yyyy, HH:mm:ss');
   }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.firestore.collection(`conversations`, ref => ref.where('id', '==', this.id)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
        console.log(this.myArray);
      });
      this.tab = Array.from(new Set(this.myArray));
    });
    this.retrieveChat();
  }

  saveMessage(message: string, date: string): void {
    this.chat.uid = this.uid;
    this.chat.idConversation = this.id;
    this.chat.type = 'message';
    this.chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    console.log(date);
    this.chat.message = message;
    this.chatService.create(this.chat).then(() => {
      console.log('Message OK');
    });
  }

  retrieveChat(): void {
    this.chatService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.messages = data;
      console.log(this.messages);
    });
  }

}