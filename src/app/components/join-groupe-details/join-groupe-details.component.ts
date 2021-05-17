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
    this.est_Membre(this.currentGroupe.id, this.uid);
    this.estMembre = (this.est_Membre(this.currentGroupe.id, this.uid));
  }

  est_Membre(idGroupe: string, uid: string): boolean {
    this.firestore.collection(`membres`, ref => ref.where('idGroupe', '==', idGroupe)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
        this.myArray.forEach(doc => {
          if (doc.uid === this.uid) {
            this.estMembre = true;
          }
          else {
            this.estMembre = false;
          }
        });
      });
    });
    return this.estMembre;
    }

  saveMembre(): void {
    if (this.est_Membre(this.currentGroupe.id, this.uid) === false) {
      this.membre.idGroupe = this.currentGroupe.id;
      this.membre.uid = this.uid;
      this.membreService.create(this.membre).then(() => {
        this.notifier.notify('success', 'Vous avez rejoint le groupe avec succès !');
        this.router.navigate(['/home']);
      });
    } else {
      this.notifier.notify('error', 'Vous êtes déjà membre de ce groupe...');
    }
  }
}


