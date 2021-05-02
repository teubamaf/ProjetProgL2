import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: Observable<any[]>;
  uid = this.authService.userData.uid;

  constructor(
    public authService: AuthService,
    firestore: AngularFirestore
  ) {
    this.items = firestore.collection(`users`).valueChanges();
  }

  ngOnInit(): void {
  }

}
