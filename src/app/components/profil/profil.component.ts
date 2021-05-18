import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  id: string;

  users: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('uid');
    this.retrieveUser();
  }

  retrieveUser(): void {
    this.authService.getUser(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

}
