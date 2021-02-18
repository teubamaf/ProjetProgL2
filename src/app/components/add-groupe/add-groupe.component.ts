import { Component, OnInit } from '@angular/core';
import Groupe from 'src/app/models/groupe.model';
import { GroupeService } from 'src/app/services/groupe.service';

@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.component.html',
  styleUrls: ['./add-groupe.component.css']
})
export class AddGroupeComponent implements OnInit {

  groupe: Groupe = new Groupe();
  submitted = false;

  constructor(private groupeService: GroupeService) { }

  ngOnInit(): void {
  }

  saveGroupe(): void {
    this.groupeService.create(this.groupe).then(() => {
      console.log('Le groupe a été créé avec succès!');
      this.submitted = true;
    });
  }

  newGroupe(): void {
    this.submitted = false;
    this.groupe = new Groupe();
  }

}
