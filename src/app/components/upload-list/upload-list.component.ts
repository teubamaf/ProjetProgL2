import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {

  fileUploads?: any[];
  public id: string;

  constructor(
    private uploadService: FileUploadService,
    private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
      // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.id);
      this.uploadService.getFiles(1000, this.id).snapshotChanges().pipe(
        map(changes =>
          // store the key
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe(fileUploads => {
        this.fileUploads = fileUploads;
      });
    }
  }
