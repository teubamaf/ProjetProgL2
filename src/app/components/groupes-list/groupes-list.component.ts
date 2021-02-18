import { Component, OnInit } from '@angular/core';
import { GroupeService } from 'src/app/services/groupe.service';
import Groupe from 'src/app/models/groupe.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-groupes-list',
  templateUrl: './groupes-list.component.html',
  styleUrls: ['./groupes-list.component.css']
})
export class GroupesListComponent implements OnInit {

  groupes?: Groupe[];
  currentGroupe?: Groupe;
  currentIndex = -1;
  name = '';

  constructor(private groupeService: GroupeService) { }

  ngOnInit(): void {
    this.retrieveGroupes();
  }

  refreshList(): void {
    this.currentGroupe = undefined;
    this.currentIndex = -1;
    this.retrieveGroupes();
  }

  retrieveGroupes(): void {
    this.groupeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.groupes = data;
    });
  }

  setActiveGroupe(groupe: Groupe, index: number): void {
    this.currentGroupe = groupe;
    this.currentIndex = index;
  }

  removeAllGroupes(): void {
    this.groupeService.deleteAll()
        .then(() => this.refreshList())
        .catch(err => console.log(err));
  }
}
