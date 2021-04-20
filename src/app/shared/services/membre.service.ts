import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Post from '../models/membre.model';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private dbPath = '/membres';

  membresRef: AngularFirestoreCollection<Post> = null;

  constructor(private db: AngularFirestore,
              public afs: AngularFirestore) {
    this.membresRef = db.collection(this.dbPath);
   }

   getAll(): AngularFirestoreCollection<Post> {
    return this.membresRef;
  }

  create(post: Post): any {
    return this.membresRef.add({ ...post })
                        .then((docRef) => {
                          this.updateId(docRef.id);
                        });
  }

  update(id: string, data: any): Promise<void> {
    return this.membresRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.membresRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('posts').doc(id).update({ id : id });
  }
}