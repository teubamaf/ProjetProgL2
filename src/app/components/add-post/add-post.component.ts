import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import Post from 'src/app/shared/models/post.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  constructor(
    private postService: PostService,
    public authService: AuthService,
    firestore: AngularFirestore
    ) {
      this.items = firestore.collection(`groupes`).valueChanges();
     }

  ngOnInit(): void {
  }

  savePost(): void {
    this.post.idCreateur = this.uid;
    this.postService.create(this.post).then(() => {
      this.submitted = true;
      console.log('Created new item successfully!');
    });
  }

  newPost(): void {
    this.submitted = true;
    this.post = new Post();
  }

}
