import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { GroupeChatService } from '../../shared/services/groupe-chat.service';
import GroupeChat from 'src/app/shared/models/groupe-chat.model';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import Membre from 'src/app/shared/models/membre.model';
import { MembreGroupeChatService } from 'src/app/shared/services/membre-groupe-chat.service';
import MembreGroupeChat from 'src/app/shared/models/membre-groupe-chat.model';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-chat-group-details',
  templateUrl: './chat-group-details.component.html',
  styleUrls: ['./chat-group-details.component.css']
})
export class ChatGroupDetailsComponent implements OnInit {

  private readonly notifier: NotifierService;

  uid = this.authService.userData.uid;
  @Input()
  groupe: GroupeChat = new GroupeChat();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentGroupe: GroupeChat = new GroupeChat();
  message = '';
  items: any;
  membreGroupeChat: MembreGroupeChat = new MembreGroupeChat();
  membreGroupeChatCollection: AngularFirestoreCollection<MembreGroupeChat>;
  myArray: any[] = [];
  estMembre = false;

  constructor(
    public groupeChatService: GroupeChatService,
    public authService: AuthService,
    public membreGroupeChatService: MembreGroupeChatService,
    public firestore: AngularFirestore,
    notifierService: NotifierService
  ) { this.notifier = notifierService; }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentGroupe = { ...this.groupe };
  }

  est_Membre(idConversation: string, uid: string): any {
    this.firestore.collection(`membre-groupe-chats`, ref => ref.where('idConversation', '==', idConversation)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
        this.myArray.forEach(doc => {
          if (doc.uid === this.uid) {
            this.estMembre = true;
          }
        });
      });
    });
    return this.estMembre;
    }

  saveMembre(): void {
    if (this.est_Membre(this.currentGroupe.id, this.uid) === false) {
      this.membreGroupeChat.idConversation = this.currentGroupe.id;
      this.membreGroupeChat.uid = this.uid;
      this.membreGroupeChatService.create(this.membreGroupeChat).then(() => {
        this.notifier.notify('success', 'Vous avez rejoint le groupe avec succès !');
      });
    } else {
      this.notifier.notify('error', 'Vous êtes déjà membre de ce groupe...!');
    }
  }
}
