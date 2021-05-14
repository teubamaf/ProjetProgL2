import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {

  fileUploads?: any[];
  public id: string;

  itemDocuments: Observable<any[]>;

  documents: any;
  currentDocument = null;
  currentIndex = -1;
  nom = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public fileService: FileService,
    public authService: AuthService
    ) {
      this.itemDocuments = firestore.collection(`uploads`).valueChanges();
     }

    ngOnInit(): void {
      // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.retrieveDocuments();
    }

  refreshList(): void {
    this.currentDocument = null;
    this.currentIndex = -1;
    this.retrieveDocuments();
  }

  retrieveDocuments(): void {
    this.fileService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.documents = data;
    });
  }

  setActiveDocument(document: any, index: any): void {
    this.currentDocument = document;
    this.currentIndex = index;
  }
}

