import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import Groupe from 'src/app/shared/models/groupe.model';

import { NotifierService } from 'angular-notifier';
import { tick } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-groupe-details',
  templateUrl: './groupe-details.component.html',
  styleUrls: ['./groupe-details.component.css']
})
export class GroupeDetailsComponent implements OnInit, OnChanges {

  private readonly notifier: NotifierService;

  @Input()
  groupe: Groupe = new Groupe();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentGroupe: Groupe = new Groupe();
  message = '';

  uid = this.authService.userData.uid;

  constructor(
    public groupeService: GroupeService,
    notifierService: NotifierService,
    public authService: AuthService
  ) { this.notifier = notifierService; }

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
      type: this.currentGroupe.type,
      idCreateur: this.uid
    };

    this.groupeService.update(this.currentGroupe.id, data)
      .then(() => this.notifier.notify('success', 'Le groupe a été modifié avec succès !'))
      .catch(err => console.log(err));
  }

  deleteGroupe(): void {
    this.groupeService.delete(this.currentGroupe.id)
      .then(() => {
        this.refreshList.emit();
        this.notifier.notify('success', 'Le groupe a été supprimé avec succès !')
      })
      .catch(err => console.log(err));
  }
}

