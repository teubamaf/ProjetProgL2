import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentaireService } from 'src/app/shared/services/commentaire.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-recherche-post',
  templateUrl: './recherche-post.component.html',
  styleUrls: ['./recherche-post.component.css']
})
export class RecherchePostComponent implements OnInit, OnDestroy {

  value: string;
  id: string;

  items: Observable<any[]>;
  itemGroupes: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;
  itemCommentaires: Observable<any[]>;

  navigationSubscription: any;
  postContenus: any;
  postTitres: any;

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
    this.itemCommentaires = firestore.collection(`commentaires`).valueChanges();
    // subscribe to the router events. Store the subscription so we can
    // unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
    // If it is a NavigationEnd event re-initalise the component
    if (e instanceof NavigationEnd) {
      this.initialiseInvites();
      }
    });
  }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.value = this.activatedRoute.snapshot.paramMap.get('value');
    console.log(this.value);
  }

  initialiseInvites(): void {
    this.value = this.activatedRoute.snapshot.paramMap.get('value');
    // Set default values and re-fetch any data you need.
    this.retrievePostContenu();
    this.retrievePostTitre();
  }

  ngOnDestroy(): void{
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  retrievePostContenu(): void {
    this.postService.getRechercheContenu(this.value, this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.postContenus = data;
    });
  }

  retrievePostTitre(): void {
    this.postService.getRechercheTitre(this.value, this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.postTitres = data;
    });
  }

  rechercher(value: string): any {
    this.router.navigate(['/recherche-post', value]);
  }

}
