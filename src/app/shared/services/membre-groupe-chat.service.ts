import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import MembreGroupeChat from '../models/membre-groupe-chat.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembreGroupeChatService {

  private dbPath = '/membre-groupe-chats';

  membreGroupeChatsRef: AngularFirestoreCollection<MembreGroupeChat>;
  idMembreGroupeChat: string;
  id: any;
  uid = this.authService.userData.uid;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public authService: AuthService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.membreGroupeChatsRef = afs.collection(this.dbPath);
   }

  getAll(): AngularFirestoreCollection<MembreGroupeChat> {
    return this.membreGroupeChatsRef;
  }

  create(membreGroupeChat: MembreGroupeChat): any {
    return this.membreGroupeChatsRef.add({ ...membreGroupeChat })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                          });
  }

  update(id: string, data: any): Promise<void> {
    return this.membreGroupeChatsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.membreGroupeChatsRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('membre-groupe-chats').doc(id).update({ id: id });
  }

}