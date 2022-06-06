import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import FileUpload from 'src/app/shared/models/file-upload.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  public id: string;

  currentDate = new Date();
  uid = this.authService.userData.uid;

  constructor(
    private uploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
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
        this.currentFileUpload.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
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