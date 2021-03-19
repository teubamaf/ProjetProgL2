import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import Post from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: Post = new Post();
  submitted = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  savePost(): void {
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
