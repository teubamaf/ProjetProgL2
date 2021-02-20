import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class  UserDetailsComponent implements OnInit, OnChanges {

  @Input() user?: User;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentUser: User = {
    login: '',
    password: '',
    adresseMail: '',
    photoUrl: '',
  };

  message = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentUser = { ...this.user };
  }

  updateUser(): void {
    const data = {
      login: this.currentUser.login,
      password: this.currentUser.password,
      adresseMail: this.currentUser.adresseMail,
      photoUrl: this.currentUser.photoUrl
    };

    if (this.currentUser.key) {
      this.userService.update(this.currentUser.key, data)
          .then(() => this.message = 'L utilisateur a été modifié avec succès!')
          .catch(err => console.log(err));
    }
  }

  deleteUser(): void {
    if (this.currentUser.key) {
      this.userService.delete(this.currentUser.key)
          .then(() => {
            this.refreshList.emit();
            this.message = 'L utilisateur a été supprimé avec succès!';
          })
          .catch(err => console.log(err));
    }
  }

}
