import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import FileUpload from 'src/app/shared/models/file-upload.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {

  @Input() fileUpload!: FileUpload;
  public id: string;

  constructor(
    private uploadService: FileUploadService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  deleteFileUpload(fileUpload: FileUpload,): void {
    this.uploadService.deleteFile(fileUpload, this.id);
  }
}