import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { GroupeService } from '../../shared/services/groupe.service';
import Groupe from 'src/app/shared/models/groupe.model';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import Membre from 'src/app/shared/models/membre.model';
import { MembreService } from 'src/app/shared/services/membre.service';


@Component({
  selector: 'app-join-groupe-details',
  templateUrl: './join-groupe-details.component.html',
  styleUrls: ['./join-groupe-details.component.css']
})
export class JoinGroupeDetailsComponent implements OnInit, OnChanges {

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
  estMembre = false;

  constructor(
    public groupeService: GroupeService,
    public authService: AuthService,
    public membreService: MembreService,
    public firestore: AngularFirestore,
    ) {
      }


  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentGroupe = { ...this.groupe };
  }

  est_Membre(idGroupe: string, uid: string): any {
    const membres = this.firestore.collection(`membres`, ref => ref.where('idGroupe', '==', idGroupe)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
        this.myArray.forEach(doc => {
          if (doc.uid === this.uid) {
            this.estMembre = true;
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
        this.message = 'Vous avez rejoint le groupe avec succès !';
      });
    } else {
      this.message = 'Vous êtes déjà membre de ce groupe...';
    }
  }
}


