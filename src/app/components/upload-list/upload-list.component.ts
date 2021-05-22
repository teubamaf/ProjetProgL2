import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileService } from 'src/app/shared/services/file.service';
import Document from 'src/app/shared/models/document.model';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {

  fileUploads?: any[];
  public id: string;

  items: Observable<any[]>;
  itemPosts: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;

  documents: any;
  currentDocument = null;
  currentIndex = -1;
  nom = '';

  uid = this.authService.userData.uid;

  document: Document;

  constructor(
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public fileService: FileService,
    public authService: AuthService,
    public router: Router
    ) {
      this.items = firestore.collection(`groupes`).valueChanges();
      this.itemPosts = firestore.collection(`post`).valueChanges();
      this.itemUsers = firestore.collection(`users`).valueChanges();
      this.itemMembres = firestore.collection(`membres`).valueChanges();
      this.itemDocuments = firestore.collection(`uploads`).valueChanges();
  }

  ngOnInit(): void {
  // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  this.retrieveDocuments();
  }

  retrieveDocuments(): void {
    this.fileService.getById(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.documents = data;
    });
  }

  rechercher(value: string): any {
    this.router.navigate(['/groupe', this.id, 'recherche-document', value]);
  }

  deleteFileUpload(id: string, fileUpload: Document): void {
    this.fileService.delete(id, fileUpload);
  }

}

