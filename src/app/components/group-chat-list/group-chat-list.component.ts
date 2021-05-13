import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-group-chat-list',
  templateUrl: './group-chat-list.component.html',
  styleUrls: ['./group-chat-list.component.css']
})
export class GroupChatListComponent implements OnInit {

  myArray: any[] = [];
  tab: any[] = [];
  itemGroupes: any[] = [];

  uid = this.authService.userData.uid;

  constructor(
    public firestore: AngularFirestore,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.firestore.collection(`membre-groupe-chats`, ref => ref.where('uid', '==', this.uid)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(docs => {
        this.firestore.collection(`groupe-chats`, ref => ref.where('id', '==', docs.idConversation)).get().subscribe(snaps => {
          snaps.forEach(docGroupe => {
            this.itemGroupes.push(docGroupe.data());
          });
        });
      });
    });
  }

}