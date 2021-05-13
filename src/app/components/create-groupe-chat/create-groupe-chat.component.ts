import { Component, OnInit } from '@angular/core';
import GroupeChat from 'src/app/shared/models/groupe-chat.model';
import { GroupeChatService } from 'src/app/shared/services/groupe-chat.service';

@Component({
  selector: 'app-create-groupe-chat',
  templateUrl: './create-groupe-chat.component.html',
  styleUrls: ['./create-groupe-chat.component.css']
})
export class CreateGroupeChatComponent implements OnInit {

  groupeChat: GroupeChat = new GroupeChat();

  constructor(
    public groupeChatService: GroupeChatService
  ) { }

  ngOnInit(): void {
  }

  saveGroupeChat(nom: string): any {
    this.groupeChat.nom = nom;
    this.groupeChatService.create(this.groupeChat).then(() => {
      console.log('Created new item successfully!');
    });
  }

}
