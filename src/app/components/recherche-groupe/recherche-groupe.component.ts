import { Component, OnDestroy, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
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

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public authService: AuthService,
    public postService: PostService
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
    this.router.navigate(['/groupe', this.id, 'recherche-post', value]);
  }

}
