import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Membre from 'src/app/shared/models/membre.model';
import { MembreService } from 'src/app/shared/services/membre.service';

import { NotifierService } from 'angular-notifier';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-list-membres-details',
  templateUrl: './list-membres-details.component.html',
  styleUrls: ['./list-membres-details.component.css']
})
export class ListMembresDetailsComponent implements OnInit, OnChanges, OnDestroy {

  private readonly notifier: NotifierService;

  @Input()
  membre: Membre = new Membre();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentMembre: Membre = new Membre();
  message = '';

  items: Observable<any[]>;
  itemGroupes: Observable<any[]>;
  itemUsers: Observable<any[]>;

  navigationSubscription: any;

  constructor(
    public membreService: MembreService,
    public firestore: AngularFirestore,
    notifierService: NotifierService,
    public router: Router
  ) {
    this.items = firestore.collection(`posts`).valueChanges();
    this.itemGroupes = firestore.collection(`groupes`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.notifier = notifierService;
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
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.message = '';
    this.currentMembre = { ...this.membre };
  }

  ngOnDestroy(): void{
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }


  ngOnChanges(): void {
    this.message = '';
    this.currentMembre = { ...this.membre };
  }

  deleteMembre(): void {
    this.membreService.delete(this.currentMembre.id)
      .then(() => {
        this.refreshList.emit();
        this.notifier.notify('success', 'Le membre a été supprimé du groupe avec succès !');
      })
      .catch(err => console.log(err));
  }

  updateMembre(): void {
    console.log(this.currentMembre.id);
    this.membreService.updateModo(this.currentMembre.id).then(() => {
      this.refreshList.emit();
      this.notifier.notify('success', 'Le membre a été promu avec succès !');
    });
  }

}
