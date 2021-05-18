import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';

import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { FileService } from 'src/app/shared/services/file.service';

import Post from 'src/app/shared/models/post.model';
import Groupe from 'src/app/shared/models/groupe.model';
import Document from 'src/app/shared/models/document.model';

import { NotifierService } from 'angular-notifier';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  private readonly notifier: NotifierService;

  items: Observable<any[]>;
  itemPosts: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;

  post: Post = new Post();
  currentGroupe: Groupe = new Groupe();
  currentDocument: Document;

  submitted = false;
  datePost = new Date();
  currentDate = new Date();
  id: string;
  titre: string;

  uid = this.authService.userData.uid;

  @Input()
  idGroupe = '';
  message = '';

  selectedFiles?: FileList;
  percentage = 0;

  groupes: any;
  tab: any[] = [];


  constructor(
    private postService: PostService,
    public authService: AuthService,
    firestore: AngularFirestore,
    public groupeService: GroupeService,
    private activatedRoute: ActivatedRoute,
    public datepipe: DatePipe,
    public fileService: FileService,
    notifierService: NotifierService

    ) {
      this.items = firestore.collection(`groupes`).valueChanges();
      this.itemPosts = firestore.collection(`post`).valueChanges();
      this.itemUsers = firestore.collection(`users`).valueChanges();
      this.itemMembres = firestore.collection(`membres`).valueChanges();
      this.itemDocuments = firestore.collection(`uploads`).valueChanges();
      this.notifier = notifierService;
     }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  savePost(nbPost: number): void {
    const nouveau = nbPost + 1;
    const data = {
      nbPosts: nouveau
    };
    this.groupeService.update(this.id, data);
    this.post.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    this.post.idCreateur = this.uid;
    this.post.idGroupe = this.id;
    this.titre = this.post.titre;
    this.postService.create(this.post).then(() => {
      console.log('La publication a été créée avec succès');
    });
    this.notifier.notify('success', 'La publication a été créée avec succès');
  }

  newPost(): void {
    this.submitted = true;
    this.post = new Post();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentDocument = new Document(file);
        this.currentDocument.titre = this.titre;
        this.currentDocument.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
        this.currentDocument.idAuteur = this.uid;
        this.currentDocument.idGroupe = this.id;
        this.fileService.pushFileToStorage(this.currentDocument).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
        console.log('Fichier uploadé');
      }
    }
  }

}
