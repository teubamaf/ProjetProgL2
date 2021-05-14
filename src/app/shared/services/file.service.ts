import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Document from '../models/document.model';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private basePath = '/uploads';
  filesRef: AngularFirestoreCollection<Document>;
  idPost: any;
  currentDate = new Date();

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    public postService: PostService,
    public afs: AngularFirestore,
  ) { 
    this.filesRef = afs.collection(this.basePath);
  }

  pushFileToStorage(document: Document): Observable<number | undefined> {
    const filePath = `${'uploads'}/${document.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, document.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          document.url = downloadURL;
          document.nom = document.file.name;
          this.saveFileData(document);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(document: Document): Promise<void> {
    return this.filesRef.add({ ...document })
    .then((docRef) => {
      this.updateId(docRef.id);
      this.postService.updateIdDocument(docRef.id, document.date);
    });
  }

  getAll(): AngularFirestoreCollection<Document> {
    return this.filesRef;
  }

  delete(id: string, file: Document): Promise<void> {
    return this.filesRef.doc(id).delete().then(() => {
      this.deleteFileStorage(file.nom);
    });
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref('uploads');
    storageRef.child(name).delete();
  }


  update(id: string, data: any): Promise<void> {
    return this.filesRef.doc(id).update(data);
  }

  updateId(id: string): any {
    this.afs.collection('uploads').doc(id).update({ id: id });
  }

  updateIdPost(id: string, idPost: string): any {
    this.afs.collection('uploads').doc(id).update({ idPost: idPost });
  }

  updateDate(id: string): any {
    this.afs.collection('uploads').doc(id).update({ date: this.currentDate });
  }

}
