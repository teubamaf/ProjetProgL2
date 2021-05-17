import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import GroupeChat from 'src/app/shared/models/groupe-chat.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeChatService } from 'src/app/shared/services/groupe-chat.service';

import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-groupe-chat',
  templateUrl: './create-groupe-chat.component.html',
  styleUrls: ['./create-groupe-chat.component.css']
})
export class CreateGroupeChatComponent implements OnInit {

  private readonly notifier: NotifierService;

  groupeChat: GroupeChat = new GroupeChat();

  message: string;

  selectedOption: string;
  printedOption: string;

  uid = this.authService.userData.uid;

  options = [
    { name: 'Public', value: 1 },
    { name: 'Privé', value: 2 }
  ];

  constructor(
    public groupeChatService: GroupeChatService,
    public router: Router,
    public authService:  AuthService,
    notifierService: NotifierService
  ) { this.notifier = notifierService; }

  ngOnInit(): void {
  }

  saveGroupeChat(nom: string): any {
    this.printedOption = this.selectedOption;
    this.groupeChat.type = this.printedOption;
    this.groupeChat.nom = nom;
    this.groupeChat.uidCreateur = this.uid;
    this.groupeChatService.create(this.groupeChat).then(() => {
      console.log('La conversation a été créée avec succès');
      this.notifier.notify('success', 'La conversation a été créée avec succès');
    });
    this.router.navigate(['/mes-messages']);
  }

}
