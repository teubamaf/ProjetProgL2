import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbonnementService } from 'src/app/shared/services/abonnement.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MembreService } from 'src/app/shared/services/membre.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  id: string;

  users: any;
  postUsers: any;
  membres: any;
  abonnements: any;
  abonne: any;

  itemDocuments: Observable<any[]>;
  itemGroupes: Observable<any[]>;
  itemUsers: Observable<any[]>;

  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public postService: PostService,
    public firestore: AngularFirestore,
    public membreService: MembreService,
    public abonnementService: AbonnementService
  ) {
    this.itemDocuments = firestore.collection(`uploads`).valueChanges();
    this.itemGroupes = firestore.collection(`groupes`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
  }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('uid');
    this.retrieveUser();
    this.retrievePostUser();
    this.retrieveMembre();
    this.retrieveAbonnement();
    this.retrieveAbonne();
  }

  retrieveUser(): void {
    this.authService.getUser(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

  retrievePostUser(): void {
    this.postService.getPostUser(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.postUsers = data;
      console.log(this.postUsers);
    });
  }

  retrieveMembre(): void {
    this.membreService.getMembre(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.membres = data;
    });
  }

  retrieveAbonnement(): void {
    this.abonnementService.getById(this.id).snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.abonnements = data;
    });
  }

  retrieveAbonne(): void {
    this.abonnementService.getByUid(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.abonne = data;
      console.log(this.abonne);
    });
  }

}
