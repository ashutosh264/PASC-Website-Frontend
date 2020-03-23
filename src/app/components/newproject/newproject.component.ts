import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../services/blog.service";
import { Observable } from "rxjs";
import { AngularFireStorage } from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import { Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthService } from "../../services/auth.service";
import { Title } from "@angular/platform-browser";

import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
  title = "New-Project";
  heading: string;
  gitlink: string;
  content: string = null;
  created: boolean;
  category: string;
  valid: boolean = true;
  public Editor = ClassicEditor;
  constructor(
    private blogService: BlogService,
    private storage: AngularFireStorage,
    public authService: AuthService,
    public router: Router,
    private titleService: Title
  ) { }

  currentUser;
  token;
  isLogin;

  async ngOnInit() {

    this.token = this.authService.loadToken()
    this.currentUser = helper.decodeToken(this.token);
    this.titleService.setTitle(this.title);

    if (this.token) {
      (await this.authService.islogged()).subscribe(res => {
        this.isLogin = res
      })
    }

  }

  async createProject() {

    if (this.isLogin) {
      const data = {
        content: this.content,
        heading: this.heading,
        link: this.gitlink,
        date: new Date().toISOString(),
        category: this.category,
        author: {
          author_name: this.currentUser.firstname + " " + this.currentUser.lastname
        },
        approve: false
      };
      this.created = true;
      const a = await this.blogService.addProject(data).subscribe();
      console.log(a);
      window.alert('Project Submitted For Evaluation');
      setTimeout(() => {
        this.created = false;
        this.router.navigate(["/achieve"]);
      }, 1000);
    }

    else {
      window.alert(" Stop Using JWT TOKEN to login in !! ")
      localStorage.clear();
      this.router.navigate(["login"]);

    }

  }
}