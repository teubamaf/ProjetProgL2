import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import Membre from 'src/app/shared/models/membre.model';
import { MembreService } from 'src/app/shared/services/membre.service';

@Component({
  selector: 'app-list-membres-details',
  templateUrl: './list-membres-details.component.html',
  styleUrls: ['./list-membres-details.component.css']
})
export class ListMembresDetailsComponent implements OnInit, OnChanges {

  @Input()
  membre: Membre = new Membre();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentMembre: Membre = new Membre();
  message = '';

  constructor(
    public membreService: MembreService
  ) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentMembre = { ...this.membre };
  }

  deleteGroupe(): void {
    this.membreService.delete(this.currentMembre.id)
      .then(() => {
        this.refreshList.emit();
        this.message = 'Le groupe a été supprimé avec succès !';
      })
      .catch(err => console.log(err));
  }

}
