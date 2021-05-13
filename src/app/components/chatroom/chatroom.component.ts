import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;

  chatForm: FormGroup;
  nickname = '';
  roomname = '';
  message = '';
  users = [];
  chats = [];
  matcher = new MyErrorStateMatcher();
  uid = this.authService.userData.uid;
  myArray: any[] = [];
  tab: any[] = [];
  pseudo: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    public firestore: AngularFirestore,
    public authService: AuthService
    ) {
        this.nickname = localStorage.getItem('nickname');
        this.roomname = this.route.snapshot.params.roomname;
        console.log(this.roomname);
        firebase.database().ref('chats/').orderByChild('roomname').equalTo(this.roomname).on('value', resp => {
         this.chats = [];
         this.chats = snapshotToArray(resp);
         setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
        });
        firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
          const roomusers = snapshotToArray(resp2);
          this.users = roomusers.filter(x => x.status === 'online');
        });
      }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
    this.firestore.collection(`users`, ref => ref.where('uid', '==', this.uid)).get().subscribe(snap => {
      snap.forEach(doc => {
        this.myArray.push(doc.data());
      });
      this.tab = Array.from(new Set(this.myArray));
      this.tab.forEach(doc =>
        this.pseudo = doc.displayName
        );
    });
  }

  onFormSubmit(form: any, pseudo: string) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = pseudo;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }

  exitChat(pseudo: string) {
    const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
    chat.roomname = this.roomname;
    chat.nickname = pseudo;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${pseudo} leave the room`;
    chat.type = 'exit';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === this.pseudo);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({status: 'offline'});
      }
    });

    this.router.navigate(['/roomlist']);
  }

}
