import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Membre from 'src/app/shared/models/membre.model';
import { MembreService } from 'src/app/shared/services/membre.service';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-list-membres-details',
  templateUrl: './list-membres-details.component.html',
  styleUrls: ['./list-membres-details.component.css']
})
export class ListMembresDetailsComponent implements OnInit, OnChanges {

  private readonly notifier: NotifierService;

  @Input()
  membre: Membre = new Membre();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentMembre: Membre = new Membre();
  message = '';

  items: Observable<any[]>;
  itemGroupes: Observable<any[]>;
  itemUsers: Observable<any[]>;

  constructor(
    public membreService: MembreService,
    public firestore: AngularFirestore,
    notifierService: NotifierService,
  ) {
    this.items = firestore.collection(`posts`).valueChanges();
    this.itemGroupes = firestore.collection(`groupes`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.message = '';
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
