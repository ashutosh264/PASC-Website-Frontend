import { Component, OnInit } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { AuthService } from '../../services/auth.service';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();

@Component({
  selector: "app-admin-feedback",
  templateUrl: "./admin-feedback.component.html",
  styleUrls: ["./admin-feedback.component.css"]
})
export class AdminFeedbackComponent implements OnInit {
  feedback;

  constructor(
    private blogService: BlogService,
    public angularFireAuth: AngularFireAuth,
    public authService:AuthService,
    public afs: AngularFirestore
  ) {}
  currentUser ;
  item: any;
  token
  isAdmin;
  async ngOnInit() {
   
     this.token = this.authService.loadToken()
    this.currentUser=false;

    if (this.token) {
      (await this.authService.isadmin()).subscribe(res => {
        this.isAdmin = res
        this.currentUser = this.isAdmin.admin
      })
    }
    this.blogService.getFeed().subscribe(item => {
      this.feedback = item;
    });

    // setTimeout(() => {
    //   this.getAdmin();
    // }, 2000);
  }

  getAdmin() {
    this.afs
      .doc(`users/${this.angularFireAuth.auth.currentUser.uid}`)
      .valueChanges()
      .subscribe(item => {
        this.currentUser = item;
      });
  }
}
