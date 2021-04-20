import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Groupe from '../models/groupe.model';
import Membre from '../models/membre.model';
import { AuthService } from './auth.service';
import { MembreService } from './membre.service';

@Injectable({
  providedIn: 'root'
})

export class GroupeService {

  private dbPath = '/groupes';

  groupesRef: AngularFirestoreCollection<Groupe>;
  idGroupe: string;
  id: any;
  uid = this.authService.userData.uid;
  membre: Membre = new Membre();

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public authService: AuthService,
    public membreService: MembreService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.groupesRef = afs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Groupe> {
    return this.groupesRef;
  }

  create(groupe: Groupe): any {
    return this.groupesRef.add({ ...groupe })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                            this.membre.idGroupe = docRef.id;
                            this.membre.uid = this.uid;
                            this.membreService.create(this.membre);
                          });
  }

  update(id: string, data: any): Promise<void> {
    return this.groupesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.groupesRef.doc(id).delete();
  }

  updateIdCreateur(id: string, uid: string): any {
    this.afs.collection('groupes').doc(id).update({ idCreateur: uid });
  }

  updateIdMembre(id: string, uid: string): any {
    this.afs.collection('groupes').doc(id).collection('membres').add({
      uid: uid
    }).then((docRef) => {
      this.updateMembre(docRef.id, id);
    });
  }

  updateId(id: string): any {
    this.afs.collection('groupes').doc(id).update({ id: id });
  }

  updateMembre(idDoc: string, idGroupe: string): any {
    this.afs.collection('groupes').doc(idGroupe).collection('membres').doc(idDoc).update({ id : idDoc });
  }
}
