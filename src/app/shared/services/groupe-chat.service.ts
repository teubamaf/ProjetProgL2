import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import GroupeChat from '../models/groupe-chat.model';
import MembreGroupeChat from '../models/membre-groupe-chat.model';
import { AuthService } from './auth.service';
import { MembreGroupeChatService } from './membre-groupe-chat.service';

@Injectable({
  providedIn: 'root'
})
export class GroupeChatService {

  private dbPath = '/groupe-chats';

  groupeChatsRef: AngularFirestoreCollection<GroupeChat>;

  idGroupeChat: string;
  id: any;
  uid = this.authService.userData.uid;

  membreGroupeChat: MembreGroupeChat = new MembreGroupeChat();

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public authService: AuthService,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public membreGroupeChatService: MembreGroupeChatService
  ) {
    this.groupeChatsRef = afs.collection(this.dbPath);
   }

  getAll(): AngularFirestoreCollection<GroupeChat> {
    return this.groupeChatsRef;
  }

  create(groupeChat: GroupeChat): any {
    return this.groupeChatsRef.add({ ...groupeChat })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                            this.membreGroupeChat.idConversation = docRef.id;
                            this.membreGroupeChat.uid = this.uid;
                            this.membreGroupeChatService.create(this.membreGroupeChat);
                          });
  }

  update(id: string, data: any): Promise<void> {
    return this.groupeChatsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.groupeChatsRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('groupe-chats').doc(id).update({ id: id });
  }

}
