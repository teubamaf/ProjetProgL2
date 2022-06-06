import { Component, OnInit } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MembreService } from 'src/app/shared/services/membre.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ggroupes-list',
  templateUrl: './groupes-list.component.html',
  styleUrls: ['./groupes-list.component.css']
})
export class GroupesListComponent implements OnInit {

  membres: any;
  groupe: any;

  currentGroupe = null;
  currentIndex = -1;
  nom = '';

  itemGroupes: Observable<any[]>;

  uid = this.authService.userData.uid;

  constructor(
    private groupeService: GroupeService,
    public authService: AuthService,
    public membreService: MembreService,
    public firestore: AngularFirestore
    ) {
      this.itemGroupes = firestore.collection(`groupes`).valueChanges();
    }

  ngOnInit(): void {
    this.retrieveGroupes();
  }

  refreshList(): void {
    this.currentGroupe = null;
    this.currentIndex = -1;
    this.retrieveGroupes();
  }

  retrieveGroupes(): void {
    this.membreService.getAdmin(this.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.membres = data;
    });
  }

  setActiveGroupe(groupe: any, index: any): void {
    this.currentGroupe = groupe;
    this.currentIndex = index;
  }
}
