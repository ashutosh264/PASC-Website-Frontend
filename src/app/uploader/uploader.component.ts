import { Component } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BlogService } from "../services/blog.service";

const helper = new JwtHelperService();

@Component({
  selector: "uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"]
})
export class UploaderComponent {
  isHovering: boolean;

  files: File[] = [];
  selected: number = 1;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public authService: AuthService,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private blogService: BlogService
  ) {}
  currentUser;
  done: boolean = true;
  nofiles = 0;
  token;
  isAdmin;
  async ngOnInit() {
    this.token = this.authService.loadToken();
    this.currentUser = false;

    if (this.token) {
      (await this.authService.isadmin()).subscribe(res => {
        this.isAdmin = res;
        this.currentUser = this.isAdmin.admin;
      });
    }

    // setTimeout(() => {
    //   this.getAdmin()
    // }, 2000);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    if (files.length > 11) {
      alert("Drop Less Than 10 files");
      return;
    }
    this.nofiles = files.length
    this.done = false;
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
    this.blogService
      .uploadGallery(this.files, this.selected)
      .subscribe(item => {
        this.done = true;
      });
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selected = event.target.value;
  }

  getAdmin() {
    this.db
      .doc(`users/${this.angularFireAuth.auth.currentUser.uid}`)
      .valueChanges()
      .subscribe(item => {
        this.currentUser = item;
      });
  }
}
