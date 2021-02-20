import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = new User();
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    this.userService.create(this.user).then(() => {
      console.log('Le groupe a été créé avec succès!');
      this.submitted = true;
    });
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

}
