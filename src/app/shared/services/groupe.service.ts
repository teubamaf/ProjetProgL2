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
  rechercheNomRef: AngularFirestoreCollection<Groupe>;
  rechercheTypeRef: AngularFirestoreCollection<Groupe>;

  idGroupe: string;
  value: string;
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

  getById(id: string): AngularFirestoreCollection<Groupe> {
    return this.afs.collection<Groupe>('groupes', ref => ref.where('id', '==', id));
  }

  getRechercheNom(value: string): AngularFirestoreCollection<Groupe> {
    this.rechercheNomRef = this.afs.collection<Groupe>('groupes', ref => ref.where('nom', '==', value));
    return this.rechercheNomRef;
  }

  getRechercheType(value: string): AngularFirestoreCollection<Groupe> {
    this.rechercheTypeRef = this.afs.collection<Groupe>('groupes', ref => ref.where('type', '==', value));
    return this.rechercheTypeRef;
  }

  create(groupe: Groupe): any {
    return this.groupesRef.add({ ...groupe })
                          .then((docRef) => {
                            this.updateId(docRef.id);
                            this.membre.idGroupe = docRef.id;
                            this.membre.grade = 'Administrateur';
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
