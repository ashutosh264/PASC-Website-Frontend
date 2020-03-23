import { Component, OnInit } from '@angular/core';
import { Blog } from '../../shared/blog'
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs'
import { BlogService } from '../../services/blog.service'
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogs : Blog[]
  constructor(private blogService : BlogService, public afs: AngularFirestore,public authService : AuthService, public angularFireAuth : AngularFireAuth,public router : Router) { }
  User;

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

    this.blogService.getAdminBlog().subscribe(item => {this.blogs = item})
    // setTimeout(() => {
    //   this.getAdmin()
    // }, 2000);
  }

  getAdmin()
  {
    this.afs.doc(`users/${this.angularFireAuth.auth.currentUser.uid}`).valueChanges().subscribe(item => {this.currentUser = item})
  }
}
