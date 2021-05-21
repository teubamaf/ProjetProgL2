import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Conversation from 'src/app/shared/models/conversation.model';
import { AmisService } from 'src/app/shared/services/amis.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConversationService } from 'src/app/shared/services/conversation.service';

@Component({
  selector: 'app-list-amis',
  templateUrl: './list-amis.component.html',
  styleUrls: ['./list-amis.component.css']
})
export class ListAmisComponent implements OnInit {

  uid = this.authService.userData.uid;

  pseudo: string;

  userAmis: any;
  amis: any;
  chats: any;
  conversations: any;
  chats2: any;
  conversations2: any;

  myArray: any[] = [];
  tab: any[] = [];

  itemUsers: Observable<any[]>;

  conversation: Conversation = new Conversation();
  notifier: NotifierService;

  constructor(
    public authService: AuthService,
    public amisService: AmisService,
    public firestore: AngularFirestore,
    public conversationService: ConversationService,
    private router: Router,
    notifierService: NotifierService
  ) {
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.retrieveAmis();
    this.retrieveUser();
  }

  retrieveAmis(): void {
    this.amisService.getById(this.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.userAmis = data;
      console.log(this.userAmis);
    });
  }

  retrieveUser(): void {
    this.amisService.getByUid(this.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.amis = data;
      console.log(this.amis);
    });
  }

  getPseudoCrea(pseudo: string, uid: string): void {
    this.firestore.collection(`users`, ref => ref.where('uid', '==', this.uid)).get().subscribe(snap => {
      snap.forEach(docs => {
        this.myArray.push(docs.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(doc => {
        this.pseudo = doc.displayName;
      });
      this.conversationService.getConversation(this.uid, uid).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        this.conversations = data;
        this.conversationService.getConv(this.uid, uid).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data2 => {
          this.chats = data2;
          if (this.conversations.length === 0 || this.conversations === undefined) {
            if (this.chats.length === 0 || this.chats === undefined) {
              this.newConversation(uid, pseudo, this.pseudo);
            }
          }
          else if (this.conversations.length === 0) {
            const idConv = this.chats[0].id;
            this.router.navigate(['/conversation', idConv]);
          }
          else if (this.chats.length === 0) {
            const id = this.conversations[0].id;
            this.router.navigate(['/conversation', id]);
          }
        });
      });
    });
  }

  newConversation(id: string, pseudo: string, pseudoCrea: string): void {
    this.conversation.uidCrea = this.uid;
    this.conversation.uid = id;
    this.conversation.pseudo = pseudo;
    this.conversation.pseudoCrea = pseudoCrea;
    this.conversationService.create(this.conversation).then(() => {
      this.notifier.notify('success', 'La conversation a été créée avec succès');
    });
  }
}
