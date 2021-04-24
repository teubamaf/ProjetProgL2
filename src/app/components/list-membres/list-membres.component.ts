import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MembreService } from 'src/app/shared/services/membre.service';

@Component({
  selector: 'app-list-membres',
  templateUrl: './list-membres.component.html',
  styleUrls: ['./list-membres.component.css']
})
export class ListMembresComponent implements OnInit {

  public id: string;
  myArray: any[] = [];
  tab: any[] = [];
  itemUsers: any[] = [];
  idMembres: any[] = [];
  membres: any;
  currentMembre = null;
  currentIndex = -1;
  nom = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    private membreService: MembreService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.retrieveMembre();
  }

  refreshList(): void {
    this.currentMembre = null;
    this.currentIndex = -1;
    this.retrieveMembre();
  }

  retrieveMembre(): void {
    this.membreService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.membres = data;
    });
  }

  setActiveMembre(membre: any, index: any): void {
    this.currentMembre = membre;
    this.currentIndex = index;
  }

}
