import { Component, OnDestroy, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-recherche-menu',
  templateUrl: './recherche-menu.component.html',
  styleUrls: ['./recherche-menu.component.css']
})
export class RechercheMenuComponent implements OnInit, OnDestroy {

  value: string;

  itemUsers: Observable<any[]>;

  groupeNoms: any;
  groupeTypes: any;
  userPseudos: any;

  navigationSubscription: any;

  tab: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public authService: AuthService,
    public groupeService: GroupeService
  ) {
    this.itemUsers = firestore.collection(`users`).valueChanges();
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
    this.value = this.activatedRoute.snapshot.paramMap.get('value');
    // Set default values and re-fetch any data you need.
    this.retrieveGroupeNom();
    this.retrieveGroupeType();
    this.retrieveUserPseudo();
    // expected output: true
  }

  ngOnDestroy(): void{
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
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
      this.tab = data;
      console.log(this.tab);
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
      console.log(this.groupeTypes);
    });
  }

  retrieveUserPseudo(): void {
    this.authService.getRecherchePseudo(this.value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.userPseudos = data;
      console.log(this.userPseudos);
    });
  }

  rechercher(value: string): any {
    this.router.navigate(['/recherche', value]);
  }

}
