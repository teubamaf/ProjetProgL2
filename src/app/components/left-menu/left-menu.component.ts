import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  items: Observable<any[]>;

  constructor(
    public authService: AuthService,
    firestore: AngularFirestore,
  ) {
    this.items = firestore.collection(`groupes`).valueChanges();
  }

  ngOnInit(): void {
  }

}
