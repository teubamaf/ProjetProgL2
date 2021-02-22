import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
import User from '../models/user.model';
import auth from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';

  usersRef: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list('/users');
   }

   getAll(): AngularFireList<User> {
     return this.usersRef;
   }

   create(user: User): any {
     return this.usersRef.push(user);
   }

   update(key: string, value: any): Promise<void> {
     return this.usersRef.update(key, value);
   }

   delete(key: string): Promise<void> {
    return this.usersRef.remove(key);
   }

   deleteAll(): Promise<void> {
      return this.usersRef.remove();
   }
}