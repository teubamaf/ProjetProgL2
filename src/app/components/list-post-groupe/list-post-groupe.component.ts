import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-list-post-groupe',
  templateUrl: './list-post-groupe.component.html',
  styleUrls: ['./list-post-groupe.component.css']
})
export class ListPostGroupeComponent implements OnInit {

  id: string;

  myArray: any[] = [];
  tab: any[] = [];
  tabUsers: any[] = [];

  items: Observable<any[]>;
  itemPosts: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;

  uid = this.authService.userData.uid;

  posts: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public postService: PostService,
    public authService: AuthService,
    public router: Router,
    public groupeService: GroupeService
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
    this.retrievePost();
  }

  retrievePost(): void {
    this.postService.getPost(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
    });
  }

  DeletePost(idPost: string, nbPost: number): any {
    const nouveau = nbPost - 1;
    const data = {
      nbPosts: nouveau
    };
    this.groupeService.update(this.id, data);
    this.postService.delete(idPost);
  }

  rechercher(value: string): any {
    this.router.navigate(['/groupe', this.id, 'recherche-publications', value]);
  }

}
