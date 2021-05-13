import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import FileUpload from '../models/file-upload.model';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = '/uploads';
  fileRef: any;
  idPost: any;
  currentDate = new Date();

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    public postService: PostService,
  ) { }

  pushFileToStorage(fileUpload: FileUpload, id: string): Observable<number | undefined> {
    const filePath = `${id}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload, id);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload, id: string): void {

    this.db.list(id).push(fileUpload)
                    .then((docRef) => {
                      this.updateId(id, docRef.key);
                      this.postService.updateIdDocument(docRef.key, fileUpload.date);
                    });
  }

  getFiles(numberItems: number, id: string): AngularFireList<FileUpload> {
    return this.db.list(id, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload, id: string): void {
    this.deleteFileDatabase(fileUpload.key, id)
      .then(() => {
        this.deleteFileStorage(fileUpload.name, id);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string, id: string): Promise<void> {
    return this.db.list(id).remove(key);
  }

  private deleteFileStorage(name: string, id: string): void {
    const storageRef = this.storage.ref(id);
    storageRef.child(name).delete();
  }

  update(key: string, idGroupe: string, value: any): Promise<void> {
    this.fileRef = this.db.database.ref(idGroupe);
    return this.fileRef.child(key).update(value);
  }

  updateId(idGroupe: string, idFile: string): any {
    const data = {
      id: idFile
    };
    this.update(idFile, idGroupe, data);
  }

  updateIdPost(idGroupe: string, idFile: string, idPost: string): any {
    const data = {
      idPost: idPost
    };
    this.update(idFile, idGroupe, data);
  }

  updateDate(idGroupe: string, idFile: string): any {
    const data = {
      date: this.currentDate
    };
    this.update(idFile, idGroupe, data);
  }
}
