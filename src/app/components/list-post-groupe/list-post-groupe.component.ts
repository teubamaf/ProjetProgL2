import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-list-post-groupe',
  templateUrl: './list-post-groupe.component.html',
  styleUrls: ['./list-post-groupe.component.css']
})
export class ListPostGroupeComponent implements OnInit {

  public id: string;
  myArray: any[] = [];
  tab: any[] = [];
  tabUsers: any[] = [];

  items: Observable<any[]>;
  itemGroupes: Observable<any[]>;
  itemUsers: Observable<any[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public postService: PostService
  ) {
    this.items = firestore.collection(`posts`).valueChanges();
    this.itemGroupes = firestore.collection(`groupes`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
   }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.firestore.collection(`posts`, ref => ref.where('idGroupe', '==', this.id)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(docs => {
        const users = this.firestore.collection(`users`, ref => ref.where('uid', '==', docs.idCreateur)).get().subscribe(snaps => {
          snaps.forEach(docGroupe => {
            this.tabUsers.push(docGroupe.data());
          });
        });
      });
    });
  }

  DeletePost(idPost: string): any {
    this.postService.delete(idPost);
  }

}
