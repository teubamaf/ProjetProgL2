import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Abonnement from '../models/abonnement.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  private dbPath = '/abonnements';

  abonnementsRef: AngularFirestoreCollection<Abonnement>;
  idAbonnement: string;
  id: any;
  uid = this.authService.userData.uid;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public authService: AuthService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.abonnementsRef = afs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Abonnement> {
    return this.abonnementsRef;
  }

  getById(uid: string): AngularFirestoreCollection<Abonnement> {
    return this.afs.collection<Abonnement>('abonnements', ref => ref.where('uidAbonne', '==', uid));
  }

  getByUid(uid: string): AngularFirestoreCollection<Abonnement> {
    return this.afs.collection<Abonnement>('abonnements', ref => ref.where('uid', '==', uid));
  }

  create(abonnement: Abonnement): any {
    return this.abonnementsRef.add({ ...abonnement })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                          });
  }

  update(id: string, data: any): Promise<void> {
    return this.abonnementsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.abonnementsRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('abonnements').doc(id).update({ id: id });
  }
}
