import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  items: Observable<any[]>;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    firestore: AngularFirestore
  ) {
    this.items = firestore.collection(`users`).valueChanges();
  }

  ngOnInit(): void { }

}