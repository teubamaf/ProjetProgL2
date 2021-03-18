import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Groupe } from '../models/groupe.model';

import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GroupeService {

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  getGroupeDoc(idGroupe: string): any {
    return this.afs.collection('groupes').doc(idGroupe).valueChanges();
  }

  getGroupeList(): any {
    return this.afs.collection('groupes').snapshotChanges();
  }

  createGroupe(groupe: Groupe): any {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('groupes').add(groupe).then(response => {
        console.log(response);
      }, error => reject(error));
    });
  }

  deleteGroupe(groupe: Groupe): any {
    return this.afs.collection('groupes').doc(groupe.idGroupe).delete();
  }

  updateGroupe(groupe: Groupe, idGroupe: string): any {
    return this.afs.collection('groupes').doc(idGroupe).update({
        nom: groupe.nom,
      });
  }
}
