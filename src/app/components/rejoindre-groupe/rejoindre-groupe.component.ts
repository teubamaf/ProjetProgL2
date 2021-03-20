import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rejoindre-groupe',
  templateUrl: './rejoindre-groupe.component.html',
  styleUrls: ['./rejoindre-groupe.component.css']
})
export class RejoindreGroupeComponent implements OnInit {

  groupes: any;
  currentGroupe = null;
  currentIndex = -1;
  nom = '';

  constructor(
    private groupeService: GroupeService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.retrieveGroupes();
  }

  refreshList(): void {
    this.currentGroupe = null;
    this.currentIndex = -1;
    this.retrieveGroupes();
  }

  retrieveGroupes(): void {
    this.groupeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.groupes = data;
    });
  }

  setActiveGroupe(groupe: any, index: any): void {
    this.currentGroupe = groupe;
    this.currentIndex = index;
  }

}
