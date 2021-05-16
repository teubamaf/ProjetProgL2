import { DatePipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentaireService } from 'src/app/shared/services/commentaire.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-recherche-menu',
  templateUrl: './recherche-menu.component.html',
  styleUrls: ['./recherche-menu.component.css']
})
export class RechercheMenuComponent implements OnInit {

  value: string;

  items: Observable<any[]>;
  itemGroupes: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;
  itemCommentaires: Observable<any[]>;

  groupeNoms: any;
  groupeTypes: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public authService: AuthService,
    private db: AngularFireDatabase,
    public uploadService: FileUploadService,
    public commentaireService: CommentaireService,
    public datepipe: DatePipe,
    public postService: PostService,
    public groupeService: GroupeService
  ) {
    this.items = firestore.collection(`posts`).valueChanges();
    this.itemGroupes = firestore.collection(`groupes`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.itemMembres = firestore.collection(`membres`).valueChanges();
    this.itemDocuments = firestore.collection(`uploads`).valueChanges();
    this.itemCommentaires = firestore.collection(`commentaires`).valueChanges();
  }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.value = this.activatedRoute.snapshot.paramMap.get('value');
    console.log(this.value);
    this.retrieveGroupeNom();
    this.retrieveGroupeType();
  }

  retrieveGroupeNom(): void {
    this.groupeService.getRechercheNom(this.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.groupeNoms = data;
    });
  }

  retrieveGroupeType(): void {
    this.groupeService.getRechercheType(this.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.groupeTypes = data;
    });
  }

}
