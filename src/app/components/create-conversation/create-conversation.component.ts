import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Conversation from 'src/app/shared/models/conversation.model';
import { ConversationService } from 'src/app/shared/services/conversation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-conversation',
  templateUrl: './create-conversation.component.html',
  styleUrls: ['./create-conversation.component.css']
})
export class CreateConversationComponent implements OnInit {

  users: any;
  myArray: any[] = [];
  tab: any[] = [];

  uidConv: string;
  pseudoConv: string;
  pseudo: string;
  message: string;

  conversation: Conversation = new Conversation();

  uid = this.authService.userData.uid;

  itemUsers: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    public authService: AuthService,
    public conversationService: ConversationService,
    private router: Router,
  ) {
    this.itemUsers = firestore.collection(`users`).valueChanges();
   }

  ngOnInit(): void {
  }

  recherche(pseudo: string): any{
    this.authService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.myArray.push(data);
      this.myArray.forEach(doc => {
        doc.forEach(data => {
          if (data.displayName === pseudo) {
            this.uidConv = data.uid;
            this.pseudoConv = data.displayName;
            this.firestore.collection(`users`, ref => ref.where('uid', '==', this.uid)).get().subscribe(snap => {
              snap.forEach(docs => {
                this.myArray.push(docs.data());
              });
              this.tab = Array.from(new Set(this.myArray));
              this.tab.forEach(doc2 =>
                this.pseudo = doc2.displayName
                );
              this.saveConversation(this.uidConv, this.pseudoConv, this.pseudo);
            });
          }
        });
      });
    });
  }

  getPseudoCrea(pseudo: string, uid: string): void {
    this.firestore.collection(`users`, ref => ref.where('uid', '==', this.uid)).get().subscribe(snap => {
      snap.forEach(docs => {
        this.myArray.push(docs.data());
        console.log(this.myArray);
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(doc => {
        this.pseudo = doc.displayName;
      });
      this.saveConversation(uid, pseudo, this.pseudo);
    });
  }

  saveConversation(uidRecherche: string, pseudoRecherche: string, pseudoCrea: string): void {
    this.conversation.uidCrea = this.uid;
    this.conversation.uid = uidRecherche;
    this.conversation.pseudo = pseudoRecherche;
    this.conversation.pseudoCrea = pseudoCrea;
    this.conversationService.create(this.conversation).then(() => {
      console.log('La conversation a été créée avec succès');
      this.message = 'La conversation a été créée avec succès';
    });
    this.router.navigate(['/mes-messages']);
  }

}
