import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Membre from '../models/membre.model';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private dbPath = '/membres';

  membresRef: AngularFirestoreCollection<Membre> = null;

  constructor(private db: AngularFirestore,
              public afs: AngularFirestore) {
    this.membresRef = db.collection(this.dbPath);
   }

   getAll(): AngularFirestoreCollection<Membre> {
    return this.membresRef;
  }

  getMembreGroupe(idGroupe: string): AngularFirestoreCollection<Membre> {
    return this.afs.collection<Membre>('membres', ref => ref.where('idGroupe', '==', idGroupe));
  }

  getGroupe(idGroupe: string, value: string): AngularFirestoreCollection<Membre> {
    return this.afs.collection<Membre>('membres', ref => ref.where('idGroupe', '==', idGroupe).where('uid', '==', value));
  }

  create(membre: Membre): any {
    return this.membresRef.add({ ...membre })
                        .then((docRef) => {
                          this.updateId(docRef.id);
                          this.updateGrade(docRef.id);
                        });
  }

  update(id: string, data: any): Promise<void> {
    return this.membresRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.membresRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('membres').doc(id).update({ id : id });
  }

  updateGrade(id: string): any {
    this.afs.collection('membres').doc(id).update({ grade : 'Membre' });
  }

  updateModo(id: string): any {
    return this.afs.collection('membres').doc(id).update({ grade : 'Modérateur' });
  }

}