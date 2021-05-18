import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { GroupeService } from '../../shared/services/groupe.service';
import Groupe from 'src/app/shared/models/groupe.model';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import Membre from 'src/app/shared/models/membre.model';
import { MembreService } from 'src/app/shared/services/membre.service';
import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { map } from 'rxjs/operators';
import { ImportsNotUsedAsValues } from 'typescript';


@Component({
  selector: 'app-join-groupe-details',
  templateUrl: './join-groupe-details.component.html',
  styleUrls: ['./join-groupe-details.component.css']
})
export class JoinGroupeDetailsComponent implements OnInit, OnChanges {

  private readonly notifier: NotifierService;

  uid = this.authService.userData.uid;
  @Input()
  groupe: Groupe = new Groupe();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentGroupe: Groupe = new Groupe();
  message = '';
  items: any;
  membre: Membre = new Membre();
  membreCollection: AngularFirestoreCollection<Membre>;
  myArray: any[] = [];
  estMembre = true;
  membreGroupes: any;

  constructor(
    public groupeService: GroupeService,
    public authService: AuthService,
    public membreService: MembreService,
    public firestore: AngularFirestore,
    public router: Router,
    notifierService: NotifierService
    ) {
      this.items = firestore.collection(`membres`).valueChanges();
      this.notifier = notifierService;
      }


  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentGroupe = { ...this.groupe };
    console.log(this.currentGroupe.nbMembres);
    this.est_Membre(this.currentGroupe.id, this.uid);
  }

  est_Membre(idGroupe: string, uid: string): void {
    this.membreService.getGroupe(idGroupe, uid).snapshotChanges().pipe(
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

  saveMembre(): void {
    const nouveau = this.currentGroupe.nbMembres + 1;
    const data = {
      nbMembres: nouveau
    };
    this.groupeService.update(this.currentGroupe.id, data);
    this.membre.idGroupe = this.currentGroupe.id;
    this.membre.uid = this.uid;
    this.membreService.create(this.membre).then(() => {
      this.notifier.notify('success', 'Vous avez rejoint le groupe avec succès !');
      this.router.navigate(['/home']);
    });
  }
}


