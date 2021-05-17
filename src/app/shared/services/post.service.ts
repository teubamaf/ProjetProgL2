import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Post from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private dbPath = '/posts';
  postData: any;
  myArray: any[] = [];
  tab: any[] = [];

  postsRef: AngularFirestoreCollection<Post> = null;
  postDateRef: AngularFirestoreCollection<Post>;
  rechercheContenuRef: AngularFirestoreCollection<Post>;
  rechercheTitreRef: AngularFirestoreCollection<Post>;

  constructor(
    private db: AngularFirestore,
    public afs: AngularFirestore
    ) {
    this.postsRef = db.collection(this.dbPath);
    this.postDateRef = afs.collection<Post>('posts', ref => ref.orderBy('date', 'desc'));
   }

   getAll(): AngularFirestoreCollection<Post> {
    return this.postsRef;
  }

  getPost(id: string): AngularFirestoreCollection<Post> {
    return this.afs.collection('posts', ref => ref.where('idGroupe', '==', id).orderBy('date', 'desc'));
  }

  getDate(): AngularFirestoreCollection<Post> {
    return this.postDateRef;
  }

  getRechercheContenu(value: string, idGroupe: string): AngularFirestoreCollection<Post> {
    this.rechercheContenuRef = this.afs.collection<Post>('posts', ref => ref.where('contenu', '==', value));
    return this.rechercheContenuRef;
  }

  getRechercheTitre(value: string, idGroupe: string): AngularFirestoreCollection<Post> {
    this.rechercheTitreRef = this.afs.collection<Post>('posts', ref => ref.where('titre', '==', value));
    return this.rechercheTitreRef;
  }

  create(post: Post): any {
    return this.postsRef.add({ ...post })
                        .then((docRef) => {
                          this.updateId(docRef.id);
                        });
  }

  update(id: string, data: any): Promise<void> {
    return this.postsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.postsRef.doc(id).delete();
  }

  updateId(id: string): any {
    this.afs.collection('posts').doc(id).update({ id : id });
  }

  updateIdDocument(key: string, date: string): any {
    this.afs.collection(`posts`, ref => ref.where('date', '==', date)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(docs => {
        console.log(key);
        this.afs.collection('posts').doc(docs.id).update({ idDocument: key });
      });
    });

  }

}
