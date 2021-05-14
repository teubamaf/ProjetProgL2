import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-statistiques-groupe',
  templateUrl: './statistiques-groupe.component.html',
  styleUrls: ['./statistiques-groupe.component.css']
})
export class StatistiquesGroupeComponent implements OnInit {

  items: Observable<any[]>;
  itemPosts: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;

  uid = this.authService.userData.uid;

  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public fileService: FileService,
    public authService: AuthService
  ) {
    this.items = firestore.collection(`groupes`).valueChanges();
    this.itemPosts = firestore.collection(`post`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.itemMembres = firestore.collection(`membres`).valueChanges();
    this.itemDocuments = firestore.collection(`uploads`).valueChanges();
  }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
