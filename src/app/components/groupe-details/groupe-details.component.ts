import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import Groupe from 'src/app/shared/models/groupe.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-groupe-details',
  templateUrl: './groupe-details.component.html',
  styleUrls: ['./groupe-details.component.css']
})
export class GroupeDetailsComponent implements OnInit, OnChanges {

  @Input() groupe?: Groupe;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentGroupe: Groupe = {
    name: '',
    type: '',
    createur: '',
    photoUrl: '',
  };

  message = '';

  constructor(private groupeService: GroupeService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentGroupe = { ...this.groupe };
  }

  updateGroupe(): void {
    const data = {
      name: this.currentGroupe.name,
      type: this.currentGroupe.type,
      createur: this.currentGroupe.createur,
      photoUrl: this.currentGroupe.photoUrl
    };

    if (this.currentGroupe.key) {
      this.groupeService.update(this.currentGroupe.key, data)
          .then(() => this.message = 'Le groupe a été modifié avec succès!')
          .catch(err => console.log(err));
    }
  }

  deleteGroupe(): void {
    if (this.currentGroupe.key) {
      this.groupeService.delete(this.currentGroupe.key)
          .then(() => {
            this.refreshList.emit();
            this.message = 'Le groupe a été supprimé avec succès!';
          })
          .catch(err => console.log(err));
    }
  }

}
