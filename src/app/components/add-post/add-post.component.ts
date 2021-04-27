import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';
import Post from 'src/app/shared/models/post.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Groupe from 'src/app/shared/models/groupe.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import FileUpload from 'src/app/shared/models/file-upload.model';

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
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  public id: string;
  titre: string;

  constructor(
    private postService: PostService,
    public authService: AuthService,
    firestore: AngularFirestore,
    public groupeService: GroupeService,
    private activatedRoute: ActivatedRoute,
    private uploadService: FileUploadService,
    ) {
      this.items = firestore.collection(`groupes`).valueChanges();
     }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  savePost(): void {
    this.post.date = this.currentDate;
    this.post.idCreateur = this.uid;
    this.post.idGroupe = this.id;
    this.titre = this.post.titre;
    this.postService.create(this.post).then(() => {
      console.log('Created new item successfully!');
    });
    this.message = 'La publication a été créée avec succès';
  }

  newPost(): void {
    this.submitted = true;
    this.post = new Post();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.currentFileUpload.titre = this.titre;
        this.currentFileUpload.date = this.currentDate;
        this.currentFileUpload.idAuteur = this.uid;
        this.currentFileUpload.idGroupe = this.id;
        this.uploadService.pushFileToStorage(this.currentFileUpload, this.id).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
        console.log('Fichier uploadé');
      }
    }

  }
}
