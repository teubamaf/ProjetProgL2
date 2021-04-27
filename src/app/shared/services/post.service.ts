import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PromiseType } from 'protractor/built/plugins';
import Post from '../models/post.model';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private dbPath = '/posts';
  postData: any;
  myArray: any[] = [];
  tab: any[] = [];

  postsRef: AngularFirestoreCollection<Post> = null;

  constructor(
    private db: AngularFirestore,
    public afs: AngularFirestore
    ) {
    this.postsRef = db.collection(this.dbPath);
   }

   getAll(): AngularFirestoreCollection<Post> {
    return this.postsRef;
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

  updateIdDocument(key: string, date: Date): any {
    this.afs.collection(`posts`, ref => ref.where('date', '==', date)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(docs => {
        this.afs.collection('posts').doc(docs.id).update({ idDocument: key });
      });
    });

  }

}
