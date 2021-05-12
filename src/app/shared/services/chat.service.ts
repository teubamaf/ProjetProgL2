import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Chats from '../models/chats.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbPath = '/chats';

  chatsRef: AngularFirestoreCollection<Chats>;
  idChat: string;
  id: any;
  uid = this.authService.userData.uid;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public authService: AuthService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.chatsRef = afs.collection(this.dbPath);
   }

  getAll(): AngularFirestoreCollection<Chats> {
    return this.chatsRef;
  }

  create(chat: Chats): any {
    return this.chatsRef.add({ ...chat })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                          });
  }

  update(id: string, data: any): Promise<void> {
    return this.chatsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.chatsRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('chats').doc(id).update({ id: id });
  }

}
