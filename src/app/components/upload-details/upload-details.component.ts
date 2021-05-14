import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import FileUpload from 'src/app/shared/models/file-upload.model';
import { ActivatedRoute } from '@angular/router';
import Document from 'src/app/shared/models/document.model';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit, OnChanges {

  @Input()
  document: Document;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentDocument: Document;
  message = '';

  public id: string;

  constructor(
    private uploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    public fileService: FileService
  ) { }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.message = '';
  }

  deleteFileUpload(id: string, fileUpload: Document): void {
    this.fileService.delete(id, fileUpload);
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentDocument = { ...this.document };
  }

}

