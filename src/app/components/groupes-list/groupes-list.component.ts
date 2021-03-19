import { Component, OnInit } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { map } from 'rxjs/operators';
import { Groupe } from 'src/app/shared/models/groupe.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-groupes-list',
  templateUrl: './groupes-list.component.html',
  styleUrls: ['./groupes-list.component.css']
})
export class GroupesListComponent implements OnInit {

  Groupes!: Groupe[];
  items: Observable<any[]>;

  currentIndex = -1;
  currentGroupe: Groupe | undefined;

  constructor(
    private groupeService: GroupeService,
    firestore: AngularFirestore,
    public authService: AuthService
    ) {
    this.items = firestore.collection(`groupes`).valueChanges();
   }

  ngOnInit(): void {
  }

  refreshList(): void {
    this.currentGroupe = undefined;
    this.currentIndex = -1;
  }

  setActiveGroupe(groupe: Groupe, index: number): void {
    this.currentGroupe = groupe;
    this.currentIndex = index;
  }

  removeGroupe = (groupe: any) => this.groupeService.deleteGroupe(groupe);
}
