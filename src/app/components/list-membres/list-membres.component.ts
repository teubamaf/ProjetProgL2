import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MembreService } from 'src/app/shared/services/membre.service';

@Component({
  selector: 'app-list-membres',
  templateUrl: './list-membres.component.html',
  styleUrls: ['./list-membres.component.css']
})
export class ListMembresComponent implements OnInit {

  public id: string;
  myArray: any[] = [];
  tab: any[] = [];
  items: Observable<any[]>;
  itemPosts: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;
  membres: any;
  currentMembre = null;
  currentIndex = -1;
  nom = '';
  uid = this.authService.userData.uid;

  constructor(
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    private membreService: MembreService,
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
    console.log(this.id);
    this.retrieveMembre();
  }

  refreshList(): void {
    this.currentMembre = null;
    this.currentIndex = -1;
    this.retrieveMembre();
  }

  retrieveMembre(): void {
    this.membreService.getMembreGroupe(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.membres = data;
    });
  }

  setActiveMembre(membre: any, index: any): void {
    this.currentMembre = membre;
    this.currentIndex = index;
  }

  rechercher(value: string): any {
    this.router.navigate(['/recherche-membre', value]);
  }

}
