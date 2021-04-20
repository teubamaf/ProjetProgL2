import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router'; // import router

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  items: Observable<any[]>;
  myArray: any[] = [];
  tab: any[] = [];
  uid = this.authService.userData.uid;
  itemGroupes: any[] = [];

  constructor(
    public authService: AuthService,
    public firestore: AngularFirestore,
    public router: Router
  ) {
    this.items = firestore.collection(`groupes`).valueChanges();
  }

  ngOnInit(): void {
    this.firestore.collection(`membres`, ref => ref.where('uid', '==', this.uid)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(docs => {
        const groupes = this.firestore.collection(`groupes`, ref => ref.where('id', '==', docs.idGroupe)).get().subscribe(snaps => {
          snaps.forEach(docGroupe => {
            this.itemGroupes.push(docGroupe.data());
          });
        });
      });
    });
  }
}
