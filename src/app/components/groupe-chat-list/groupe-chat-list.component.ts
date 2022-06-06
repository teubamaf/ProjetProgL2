import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

import { map } from 'rxjs/operators';
import { GroupeChatService } from 'src/app/shared/services/groupe-chat.service';

@Component({
  selector: 'app-groupe-chat-list',
  templateUrl: './groupe-chat-list.component.html',
  styleUrls: ['./groupe-chat-list.component.css']
})
export class GroupeChatListComponent implements OnInit {

  groupes: any;
  currentGroupe = null;
  currentIndex = -1;
  nom = '';

  constructor(
    private groupeChatService: GroupeChatService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.retrieveGroupeChat();
  }

  refreshList(): void {
    this.currentGroupe = null;
    this.currentIndex = -1;
    this.retrieveGroupeChat();
  }

  retrieveGroupeChat(): void {
    this.groupeChatService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.groupes = data;
    });
  }

  setActiveGroupe(groupe: any, index: any): void {
    this.currentGroupe = groupe;
    this.currentIndex = index;
  }
}
