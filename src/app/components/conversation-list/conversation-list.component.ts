import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConversationService } from 'src/app/shared/services/conversation.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {

  conversations: any;

  uid = this.authService.userData.uid;

  constructor(
    public conversationService: ConversationService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.retrieveConversation();
  }


  retrieveConversation(): void {
    this.conversationService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.conversations = data;
    });
  }
}
