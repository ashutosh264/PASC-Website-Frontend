import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../services/blog.service";
import { Observable } from "rxjs";
import { AngularFireStorage } from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import { Router } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthService } from "../../services/auth.service";
import { Title } from "@angular/platform-browser";

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

  ngOnInit() {
  }

  async createProject() {
    const data = {
      content: this.content,
      heading: this.heading,
      link: this.gitlink,
      date: new Date().toISOString(),
      category: this.category,
      author: {
        author_name: this.authService.authState.displayName
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
    }, 3000);
  }
}
