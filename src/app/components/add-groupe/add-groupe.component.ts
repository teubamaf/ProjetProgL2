import { Component, OnInit } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { AuthService } from '../../shared/services/auth.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.component.html',
  styleUrls: ['./add-groupe.component.css']
})

export class AddGroupeComponent implements OnInit {

  public groupeForm: FormGroup;

  uid = this.authService.userData.uid;

  items: Observable<any[]>;

  constructor(
    private groupeService: GroupeService,
    public authService: AuthService,
    firestore: AngularFirestore,
    public formBuilder: FormBuilder,
    public router: Router
    ) {
      this.items = firestore.collection(`users`).valueChanges();
      this.groupeForm = this.formBuilder.group({
        nom: [''],
        type: [''],
        photoUrl: [''],
        createur: ['']
      });
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.groupeService.createGroupe(this.groupeForm.value);
    this.router.navigate(['mes-groupes']);
   }

}
