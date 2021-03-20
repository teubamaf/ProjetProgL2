import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mes-groupes',
  templateUrl: './mes-groupes.component.html',
  styleUrls: ['./mes-groupes.component.css']
})
export class MesGroupesComponent implements OnInit {

  items: Observable<any[]>;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    firestore: AngularFirestore
  ) {
    this.items = firestore.collection(`posts`).valueChanges();
  }

  public nom: string;

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.nom = this.activatedRoute.snapshot.paramMap.get('nom');
    console.log(this.nom);

  }

}
