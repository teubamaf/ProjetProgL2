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

  constructor(
    public authService: AuthService,
    firestore: AngularFirestore,
    public router: Router
  ) {
    this.items = firestore.collection(`groupes`).valueChanges();
  }

  ngOnInit(): void {
  }

}
