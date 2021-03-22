import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent implements OnInit {

  items: Observable<any[]>;
  itemPosts: Observable<any[]>;
  itemUsers: Observable<any[]>;

  uid = this.authService.userData.uid;

  constructor(
    firestore: AngularFirestore,
    public authService: AuthService
  ) {
    this.items = firestore.collection(`groupes`).valueChanges();
    this.itemPosts = firestore.collection(`posts`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
  }

  ngOnInit(): void {
  }

}
