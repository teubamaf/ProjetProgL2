import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Commentaire from 'src/app/shared/models/commentaire.model';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentaireService } from 'src/app/shared/services/commentaire.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-recherche-groupe',
  templateUrl: './recherche-groupe.component.html',
  styleUrls: ['./recherche-groupe.component.css']
})
export class RechercheGroupeComponent implements OnInit, OnDestroy {

  value: string;
  id: string;

  itemUsers: Observable<any[]>;
  itemDocuments: Observable<any[]>;

  navigationSubscription: any;
  postContenus: any;
  postTitres: any;
  commentaires: any;
  pseudos: any;
  postAuteurs: any;

  commentaire: Commentaire = new Commentaire();

  uid = this.authService.userData.uid;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public authService: AuthService,
    public postService: PostService,
    public datepipe: DatePipe,
    public commentaireService: CommentaireService
  ) {
    this.itemUsers = firestore.collection(`users`).valueChanges();
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

  ngOnInit(): void {
  }

  initialiseInvites(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.value = this.activatedRoute.snapshot.paramMap.get('value');
    // Set default values and re-fetch any data you need.
    this.retrievePostTitre();
    this.retrieveCommentaires();
    this.retrievePostAuteur();
  }

  ngOnDestroy(): void{
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  retrievePostAuteur(): void {
    this.authService.getRecherchePseudo(this.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.pseudos = data;
      this.postService.getPostUser(this.pseudos[0].id).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(doc => {
        this.postAuteurs = doc;
      });
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
    this.router.navigate(['/groupe', this.id, 'recherche-post', value]);
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

}
