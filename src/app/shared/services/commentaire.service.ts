import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Commentaire from '../models/commentaire.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private dbPath = '/commentaires';

  commentairesRef: AngularFirestoreCollection<Commentaire>;
  idCommentaire: string;
  id: any;
  uid = this.authService.userData.uid;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public authService: AuthService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.commentairesRef = afs.collection(this.dbPath);
   }

  getAll(): AngularFirestoreCollection<Commentaire> {
    return this.commentairesRef;
  }

  create(commentaire: Commentaire): any {
    return this.commentairesRef.add({ ...commentaire })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                          });
  }

  update(id: string, data: any): Promise<void> {
    return this.commentairesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.commentairesRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('chats').doc(id).update({ id: id });
  }

}
