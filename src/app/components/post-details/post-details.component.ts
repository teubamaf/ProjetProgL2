import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import Post from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnChanges {

  @Input() post: Post;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentPost: Post = null;
  message = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentPost = { ...this.post };
  }

  updatePost(): void {
    const data = {
      titre: this.currentPost.titre,
      contenue: this.currentPost.contenu
    };

    this.postService.update(this.currentPost.id, data)
      .then(() => this.message = 'The tutorial was updated successfully!')
      .catch((err: any) => console.log(err));
  }

  deletePost(): void {
    this.postService.delete(this.currentPost.id)
      .then(() => {
        this.refreshList.emit();
        this.message = 'The tutorial was updated successfully!';
      })
      .catch((err: any) => console.log(err));
  }

}
