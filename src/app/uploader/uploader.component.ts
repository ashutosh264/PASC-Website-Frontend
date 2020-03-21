import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {

  isHovering: boolean;

  files: File[] = [];
  currentUser : any ;
  selected: number = 1;

  constructor(private storage: AngularFireStorage,
     private db: AngularFirestore , public authService:AuthService,  
     public angularFireAuth : AngularFireAuth,public router : Router) { }
  token;
  ngOnInit() {
  
    this.token = this.authService.loadToken()
    this.currentUser = helper.decodeToken(this.token);
   
    // setTimeout(() => {
    //   this.getAdmin()
    // }, 2000);
  }

  


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.selected = event.target.value;
  }


  getAdmin()
  {
    this.db.doc(`users/${this.angularFireAuth.auth.currentUser.uid}`).valueChanges().subscribe(item => {this.currentUser = item})
  }


}