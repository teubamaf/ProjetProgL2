import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmisService } from 'src/app/shared/services/amis.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-list-amis',
  templateUrl: './list-amis.component.html',
  styleUrls: ['./list-amis.component.css']
})
export class ListAmisComponent implements OnInit {

  uid = this.authService.userData.uid;

  userAmis: any;
  amis: any;

  itemUsers: Observable<any[]>;

  constructor(
    public authService: AuthService,
    public amisService: AmisService,
    public firestore: AngularFirestore
  ) {
    this.itemUsers = firestore.collection(`users`).valueChanges();
  }

  ngOnInit(): void {
    this.retrieveAmis();
    this.retrieveUser();
  }

  retrieveAmis(): void {
    this.amisService.getById(this.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.userAmis = data;
      console.log(this.userAmis);
    });
  }

  retrieveUser(): void {
    this.amisService.getByUid(this.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.amis = data;
      console.log(this.amis);
    });
  }
}
