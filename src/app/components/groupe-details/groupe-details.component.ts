import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import Groupe from 'src/app/shared/models/groupe.model';

@Component({
  selector: 'app-groupe-details',
  templateUrl: './groupe-details.component.html',
  styleUrls: ['./groupe-details.component.css']
})
export class GroupeDetailsComponent implements OnInit, OnChanges {

  @Input()
  groupe: Groupe = new Groupe();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentGroupe: Groupe = new Groupe();
  message = '';

  constructor(
    public groupeService: GroupeService
  ) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentGroupe = { ...this.groupe };
  }

  updateGroupe(): void {
    const data = {
      nom: this.currentGroupe.nom,
      type: this.currentGroupe.type
    };

    this.groupeService.update(this.currentGroupe.id, data)
      .then(() => this.message = 'Le groupe a été modifié avec succès !')
      .catch(err => console.log(err));
  }

  deleteGroupe(): void {
    this.groupeService.delete(this.currentGroupe.id)
      .then(() => {
        this.refreshList.emit();
        this.message = 'Le groupe a été supprimé avec succès !';
      })
      .catch(err => console.log(err));
  }
}

