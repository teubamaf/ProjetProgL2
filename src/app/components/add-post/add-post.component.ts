import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import Post from 'src/app/shared/models/post.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Groupe from 'src/app/shared/models/groupe.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  items: Observable<any[]>;

  post: Post = new Post();
  submitted = false;

  uid = this.authService.userData.uid;

  datePost = new Date();

  @Input()
  idGroupe = '';

  currentGroupe: Groupe = new Groupe();
  message = '';
  currentDate = new Date();


  constructor(
    private postService: PostService,
    public authService: AuthService,
    firestore: AngularFirestore,
    public groupeService: GroupeService
    ) {
      this.items = firestore.collection(`groupes`).valueChanges();
     }

  ngOnInit(): void {
    console.log(this.currentDate);
  }

  savePost(): void {
    this.post.date = this.currentDate;
    this.post.idCreateur = this.uid;
    this.post.idGroupe = this.idGroupe;
    this.postService.create(this.post).then(() => {
      console.log('Created new item successfully!');
    });
    this.message = 'La publication a été créée avec succès';
  }

  newPost(): void {
    this.submitted = true;
    this.post = new Post();
  }

}
