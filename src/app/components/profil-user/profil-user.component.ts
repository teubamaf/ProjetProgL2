import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Amis from 'src/app/shared/models/amis.model';
import { AmisService } from 'src/app/shared/services/amis.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MembreService } from 'src/app/shared/services/membre.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {

  id: string;

  users: any;
  postUsers: any;
  membres: any;

  itemDocuments: Observable<any[]>;
  itemGroupes: Observable<any[]>;

  amis: Amis = new Amis();

  uid = this.authService.userData.uid;

  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public postService: PostService,
    public firestore: AngularFirestore,
    public membreService: MembreService,
    public amisService: AmisService
  ) {
    this.itemDocuments = firestore.collection(`uploads`).valueChanges();
    this.itemGroupes = firestore.collection(`groupes`).valueChanges();
  }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('uid');
    this.retrieveUser();
    this.retrievePostUser();
    this.retrieveMembre();
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

  ajoutAmis(): void {
    this.amis.uid1 = this.uid;
    this.amis.uid2 = this.id;
    this.amisService.create(this.amis).then(() => {
      console.log('Created new item successfully!');
    });
  }

}
