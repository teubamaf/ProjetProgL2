import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UserListComponent implements OnInit {

  users?: User[];
  currentUser?: User;
  currentIndex = -1;
  name = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  refreshList(): void {
    this.currentUser = undefined;
    this.currentIndex = -1;
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
        .then(() => this.refreshList())
        .catch(err => console.log(err));
  }
}
