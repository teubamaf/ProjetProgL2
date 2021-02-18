import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>();
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.firebaseService.logout();
    this.isLogout.emit();
  }

}
