import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MembreService } from 'src/app/shared/services/membre.service';

import { NotifierService } from 'angular-notifier';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-quitter-groupe',
  templateUrl: './quitter-groupe.component.html',
  styleUrls: ['./quitter-groupe.component.css']
})
export class QuitterGroupeComponent implements OnInit {

  private readonly notifier: NotifierService;

  public id: string;

  items: Observable<any[]>;
  itemGroupes: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;

  uid = this.authService.userData.uid;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public authService: AuthService,
    public membreService: MembreService,
    notifierService: NotifierService,
    public groupeService: GroupeService
  ) {
    this.items = firestore.collection(`posts`).valueChanges();
    this.itemGroupes = firestore.collection(`groupes`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.itemMembres = firestore.collection(`membres`).valueChanges();
    this.notifier = notifierService;
  }

  ngOnInit(): void {
        // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(this.id);
  }

  quitter(idMembre: string, nbMembres: number): void {
    const quitter = nbMembres -1;
    const data = {
      nbMembres: quitter
    };
    this.groupeService.update(this.id, data);
    this.membreService.delete(idMembre)
                      .then(() => {
                        console.log('Vous avez quitté le groupe');
                        this.notifier.notify('warning', 'Vous avez quitté le groupe');
                      })
                      .catch(err => console.log(err));
    this.router.navigate(['/home']);
  }

}
