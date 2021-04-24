import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import Groupe from 'src/app/shared/models/groupe.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-update-groupe',
  templateUrl: './update-groupe.component.html',
  styleUrls: ['./update-groupe.component.css']
})
export class UpdateGroupeComponent implements OnInit {

  public id: string;
  @Input()
  groupe: Groupe = new Groupe();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentGroupe: Groupe = new Groupe();
  message = '';
  myArray: any[] = [];
  tab: any[] = [];
  itemUsers: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public groupeService: GroupeService,
    public firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.message = '';
    this.firestore.collection(`groupes`, ref => ref.where('id', '==', this.id)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
    });
    console.log(this.myArray);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    this.message = '';
  }

  updateGroupe(): void {
    const data = {
      nom: this.currentGroupe.nom,
      type: this.currentGroupe.type
    };

    this.groupeService.update(this.id, data)
      .then(() => this.message = 'Le groupe a été modifié avec succès !')
      .catch(err => console.log(err));
  }

  deleteGroupe(): void {
    this.groupeService.delete(this.id)
      .then(() => {
        this.refreshList.emit();
        this.message = 'Le groupe a été supprimé avec succès !';
      })
      .catch(err => console.log(err));
  }

}
