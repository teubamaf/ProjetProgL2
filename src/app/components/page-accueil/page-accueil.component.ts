import { CdkNoDataRow } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Commentaire from 'src/app/shared/models/commentaire.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentaireService } from 'src/app/shared/services/commentaire.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { PostService } from 'src/app/shared/services/post.service';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent implements OnInit {

  items: Observable<any[]>;
  itemUsers: Observable<any[]>;

  myArray: any[] = [];
  tab: any[] = [];
  itemPosts: any[] = [];
  uid = this.authService.userData.uid;
  itemGroupes: any[] = [];
  tmp: any[] = [];

  commentaire: Commentaire = new Commentaire();
  commentaires: any;
  posts: any;
  groupes: any;

  fileUploads: any[] = [];

  constructor(
    public firestore: AngularFirestore,
    public authService: AuthService,
    public commentaireService: CommentaireService,
    public datepipe: DatePipe,
    public uploadService: FileUploadService,
    public postService: PostService,
    public groupeService: GroupeService
  ) {
    this.items = firestore.collection(`groupes`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
  }

  ngOnInit(): void {
    this.firestore.collection(`membres`, ref => ref.where('uid', '==', this.uid)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(docs => {
        const groupes = this.firestore.collection(`groupes`, ref => ref.where('id', '==', docs.idGroupe)).get().subscribe(snaps => {
          snaps.forEach(docGroupe => {
            this.itemGroupes.push(docGroupe.data());
            this.tmp = Array.from(new Set(this.myArray));
            this.tmp.forEach(doc => {
            });
          });
        });
      });
    });
    this.retrieveCommentaires();
    this.retrievePosts();
    this.groupeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.groupes = data;
      this.groupes.forEach(doc => {
        console.log(doc.id);
        this.uploadService.getFiles(1000, doc.id).snapshotChanges().pipe(
          map(changes =>
            // store the key
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
          ).subscribe(fileUploads => {
          this.fileUploads = fileUploads;
        });
      });
    });
  }

  saveCommentaire(contenu: string, idPost: string, idGroupe: string): void {
    this.commentaire.contenu = contenu;
    this.commentaire.idPost = idPost;
    this.commentaire.idCrea = this.uid;
    this.commentaire.idGroupe = idGroupe;
    this.commentaire.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    this.commentaireService.create(this.commentaire).then(() => {
      console.log('Commentaire créé avec succès');
    });
  }

  retrieveCommentaires(): void {
    this.commentaireService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.commentaires = data;
    });
  }

  retrievePosts(): void {
    this.postService.getDate().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
    });
  }

  retrieveGroupes(): void {
    this.groupeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.groupes = data;
    });
  }

}
