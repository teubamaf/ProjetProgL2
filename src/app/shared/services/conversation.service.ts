import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { runInZone } from '@ng-bootstrap/ng-bootstrap/util/util';
import Conversation from '../models/conversation.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private dbPath = '/conversations';

  conversationsRef: AngularFirestoreCollection<Conversation>;
  idConversation: string;
  id: any;
  uid = this.authService.userData.uid;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public authService: AuthService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.conversationsRef = afs.collection(this.dbPath);
   }

  getAll(): AngularFirestoreCollection<Conversation> {
    return this.conversationsRef;
  }

  getConversation(uid: string, id: string): AngularFirestoreCollection<Conversation> {
    return this.afs.collection('conversations', ref => ref.where('uidCrea', '==', uid).where('uid', '==', id));
  }

  getConv(uid: string, id: string): AngularFirestoreCollection<Conversation> {
    return this.afs.collection('conversations', ref => ref.where('uid', '==', uid).where('uidCrea', '==', id));
  }

  create(conversation: Conversation): any {
    return this.conversationsRef.add({ ...conversation })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                          });
  }

  update(id: string, data: any): Promise<void> {
    return this.conversationsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.conversationsRef.doc(id).delete();
  }

  updateIdCreateur(id: string, uid: string): any {
    this.afs.collection('conversations').doc(id).update({ idCrea: uid });
  }

  updateId(id: string): any {
    this.afs.collection('conversations').doc(id).update({ id: id });
  }

}
