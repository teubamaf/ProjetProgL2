import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Commentaire from 'src/app/shared/models/commentaire.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentaireService } from 'src/app/shared/services/commentaire.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-mes-groupes',
  templateUrl: './mes-groupes.component.html',
  styleUrls: ['./mes-groupes.component.css']
})
export class MesGroupesComponent implements OnInit, OnDestroy {

  items: Observable<any[]>;
  itemGroupes: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;

  commentaire: Commentaire = new Commentaire();

  commentaires: any;
  posts: any;
  navigationSubscription: any;

  uid = this.authService.userData.uid;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public authService: AuthService,
    private db: AngularFireDatabase,
    public uploadService: FileUploadService,
    public commentaireService: CommentaireService,
    public datepipe: DatePipe,
    public postService: PostService
  ) {
    this.items = firestore.collection(`posts`).valueChanges();
    this.itemGroupes = firestore.collection(`groupes`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.itemMembres = firestore.collection(`membres`).valueChanges();
    this.itemDocuments = firestore.collection(`uploads`).valueChanges();
    // subscribe to the router events. Store the subscription so we can
    // unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
        }
      });
  }

  public id: string;
  fileUploads?: any[];

  ngOnInit(): void {
  }

  initialiseInvites(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.uploadService.getFiles(1000, this.id).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log(this.fileUploads);
    });
    this.retrieveCommentaires();
    this.retrievePost();
  }

  ngOnDestroy(): void{
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  saveCommentaire(contenu: string, idPost: string): void {
    this.commentaire.contenu = contenu;
    this.commentaire.idPost = idPost;
    this.commentaire.idCrea = this.uid;
    this.commentaire.idGroupe = this.id;
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

  retrievePost(): void {
    this.postService.getPost(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
    });
  }

  rechercher(value: string): any {
    this.router.navigate(['/groupe', this.id, 'recherche-post', value]);
  }

  likeButtonClick(nb: number, id: string) {
    const nouveau_Likes = nb+1;
    const data = {
      nbLikes : nouveau_Likes
    };
    this.postService.update(id, data);
  }

  dislikeButtonClick(nb: number, id: string) {
    const nouveau_dislikes = nb-1;
    const data = {
      nbDislikes : nouveau_dislikes
    };
    this.postService.update(id, data);
  }

  getnbLikes(id: string){
    const nombreLikeDislike = this.posts.nbDislikes-this.posts.nbLikes;
    const data = {
      nbLikesDislike : nombreLikeDislike
    };
    this.postService.update(id, data);
  }
}
