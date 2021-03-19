import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Post from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private dbPath = '/posts';

  postsRef: AngularFirestoreCollection<Post> = null;

  constructor(private db: AngularFirestore) {
    this.postsRef = db.collection(this.dbPath);
   }

   getAll(): AngularFirestoreCollection<Post> {
    return this.postsRef;
  }

  create(post: Post): any {
    return this.postsRef.add({ ...post });
  }

  update(id: string, data: any): Promise<void> {
    return this.postsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.postsRef.doc(id).delete();
  }
}
