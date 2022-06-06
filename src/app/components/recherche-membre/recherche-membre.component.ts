import { Component, OnDestroy, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { MembreService } from 'src/app/shared/services/membre.service';

@Component({
  selector: 'app-recherche-membre',
  templateUrl: './recherche-membre.component.html',
  styleUrls: ['./recherche-membre.component.css']
})
export class RechercheMembreComponent implements OnInit, OnDestroy {

  value: string;
  id: string;

  itemUsers: Observable<any[]>;
  itemDocuments: Observable<any[]>;

  navigationSubscription: any;
  membreGroupes: any;
  users: any;

  uid: any[] = [];
  tab: any[] = [];

  membres: any;
  currentMembre = null;
  currentIndex = -1;
  nom = '';

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public authService: AuthService,
    public membreService: MembreService
  ) {
    // subscribe to the router events. Store the subscription so we can
    // unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
    // If it is a NavigationEnd event re-initalise the component
    if (e instanceof NavigationEnd) {
      this.initialiseInvites();
      }
    });
    this.itemUsers = firestore.collection(`users`).valueChanges();
  }

  ngOnInit(): void {
  }

  initialiseInvites(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.value = this.activatedRoute.snapshot.paramMap.get('value');
    // Set default values and re-fetch any data you need.
    this.retrieveGroupeMembre();
  }

  ngOnDestroy(): void{
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  retrieveGroupeMembre(): void {
    this.authService.getRecherchePseudo(this.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data;
      this.uid.push(this.users[0].uid);
      if (this.users.length !== 0) {
        this.membreService.getGroupe(this.id, this.uid[0]).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(doc => {
          this.membreGroupes = doc;
          console.log(this.membreGroupes);
        });
      }
    });
  }

  rechercher(value: string): any {
    this.router.navigate(['/groupe', this.id, 'recherche-membre', value]);
  }

  setActiveMembre(membre: any, index: any): void {
    this.currentMembre = membre;
    this.currentIndex = index;
  }

  refreshList(): void {
    this.currentMembre = null;
    this.currentIndex = -1;
    this.retrieveGroupeMembre();
  }

}
