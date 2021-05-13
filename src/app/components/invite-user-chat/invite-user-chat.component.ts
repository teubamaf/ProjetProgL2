import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import MembreGroupeChat from 'src/app/shared/models/membre-groupe-chat.model';
import { MembreGroupeChatService } from 'src/app/shared/services/membre-groupe-chat.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-invite-user-chat',
  templateUrl: './invite-user-chat.component.html',
  styleUrls: ['./invite-user-chat.component.css']
})
export class InviteUserChatComponent implements OnInit {

  id: string;
  myArray: any[] = [];
  tab: any[] = [];
  itemUsers: any[] = [];
  tabMembre: any[] = [];
  users: any[] = [];
  tri: any[] = [];
  membres: any[] = [];

  items: Observable<any[]>;
  message: string;


  membreGroupeChat: MembreGroupeChat = new MembreGroupeChat();

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public membreGroupeChatService: MembreGroupeChatService
  ) { 
    this.items = firestore.collection(`users`).valueChanges();
  }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.firestore.collection(`groupe-chats`, ref => ref.where('id', '==', this.id)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(docs => {
        this.firestore.collection(`membre-groupe-chats`, ref => ref.where('idConversation', '==', docs.id)).get().subscribe(snaps => {
          snaps.forEach(docGroupe => {
            this.itemUsers.push(docGroupe.data());
            this.itemUsers.forEach(users => {
              this.tri.push(users.uid);
            });
          });
          this.tabMembre = Array.from(new Set(this.tri));
          this.firestore.collection(`users`, ref => ref.where('uid', 'not-in', this.tabMembre)).get().subscribe(snape => {
            snape.forEach(data =>
              this.membres.push(data.data())
            );
          });
        });
      });
    });
  }

  addConversation(uid: string): any {
    this.membreGroupeChat.uid = uid;
    this.membreGroupeChat.idConversation = this.id;
    this.membreGroupeChatService.create(this.membreGroupeChat).then(() => {
      console.log('Created new item successfully!');
      this.message = "L'utilisateur a été ajouté avec succès";
    });
  }

}

