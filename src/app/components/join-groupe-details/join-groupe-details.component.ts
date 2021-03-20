import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import Groupe from 'src/app/shared/models/groupe.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-join-groupe-details',
  templateUrl: './join-groupe-details.component.html',
  styleUrls: ['./join-groupe-details.component.css']
})
export class JoinGroupeDetailsComponent implements OnInit, OnChanges {

  uid = this.authService.userData.uid;
  @Input()
  groupe: Groupe = new Groupe();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentGroupe: Groupe = new Groupe();
  message = '';

  constructor(
    public groupeService: GroupeService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentGroupe = { ...this.groupe };
  }

  joinGroupe(): void {
    this.groupeService.updateIdMembre(this.currentGroupe.id, this.uid);
    this.message = 'Oui';
  }
}
