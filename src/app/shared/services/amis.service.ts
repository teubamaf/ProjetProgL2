import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Amis from '../models/amis.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AmisService {

  private dbPath = '/amis';

  amisRef: AngularFirestoreCollection<Amis>;
  idAmis: string;
  id: any;
  uid = this.authService.userData.uid;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public authService: AuthService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.amisRef = afs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Amis> {
    return this.amisRef;
  }

  getById(uid: string): AngularFirestoreCollection<Amis> {
    return this.afs.collection<Amis>('amis', ref => ref.where('uid1', '==', uid));
  }

  getByUid(uid: string): AngularFirestoreCollection<Amis> {
    return this.afs.collection<Amis>('amis', ref => ref.where('uid2', '==', uid));
  }

  getByIde(id: string, uid: string): AngularFirestoreCollection<Amis> {
    return this.afs.collection<Amis>('amis', ref => ref.where('uid1', '==', id).where('uid2', '==', uid));
  }

  getByUide(id: string, uid: string): AngularFirestoreCollection<Amis> {
    return this.afs.collection<Amis>('amis', ref => ref.where('uid1', '==', uid).where('uid2', '==', id));
  }

  create(amis: Amis): any {
    return this.amisRef.add({ ...amis })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                          });
  }

  update(id: string, data: any): Promise<void> {
    return this.amisRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.amisRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('amis').doc(id).update({ id: id });
  }
}
