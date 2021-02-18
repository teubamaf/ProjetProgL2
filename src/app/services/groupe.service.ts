import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Groupe from '../models/groupe.model';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private dbPath = '/groupes';

  groupesRef: AngularFireList<Groupe>;

  constructor(private db: AngularFireDatabase) {
    this.groupesRef = db.list(this.dbPath);
   }

   getAll(): AngularFireList<Groupe> {
     return this.groupesRef;
   }

   create(groupe: Groupe): any {
     return this.groupesRef.push(groupe);
   }

   update(key: string, value: any): Promise<void> {
     return this.groupesRef.update(key, value);
   }

   delete(key: string): Promise<void> {
    return this.groupesRef.remove(key);
   }

   deleteAll(): Promise<void> {
      return this.groupesRef.remove();
   }
}
