import { Component, OnInit } from '@angular/core';
import { GroupeService } from '../../shared/services/groupe.service';
import { AuthService } from '../../shared/services/auth.service';
import Groupe from 'src/app/shared/models/groupe.model';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { MembreService } from 'src/app/shared/services/membre.service';
import Membre from 'src/app/shared/models/membre.model';

@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.component.html',
  styleUrls: ['./add-groupe.component.css']
})

export class AddGroupeComponent implements OnInit {

  groupe: Groupe = new Groupe();
  submitted = false;
  membre: Membre = new Membre();
  uid = this.authService.userData.uid;

  items: Observable<any[]>;

  constructor(
    public groupeService: GroupeService,
    public authService: AuthService,
    firestore: AngularFirestore,
    public membreService: MembreService,
    public formBuilder: FormBuilder,
    public router: Router
    ) {
      this.items = firestore.collection(`users`).valueChanges();
    }

  ngOnInit(): void {
  }

  saveGroupe(): void {
    this.groupe.idCreateur = this.uid;
    this.groupeService.create(this.groupe).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newGroupe(): void {
    this.submitted = false;
    this.groupe = new Groupe();
  }
}
