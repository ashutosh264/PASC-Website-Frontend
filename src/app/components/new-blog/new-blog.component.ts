import { Component, OnInit } from "@angular/core";
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
  selector: "app-new-blog",
  templateUrl: "./new-blog.component.html",
  styleUrls: ["./new-blog.component.css"]
})
export class NewBlogComponent implements OnInit {
  title = "New-Blog";
  heading: string;
  master;
  subHeading: string;
  thumb: string;
  image: string =
    "https://firebasestorage.googleapis.com/v0/b/pasc-blogs.appspot.com/o/posts%2Fdemo-detail.jpeg?alt=media&token=3ff60e63-8eef-4b67-bee5-089b0b7e83da";
  content: string = null;
  uploadPer: Observable<number>;
  downloadURL: Observable<string>;
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
  ) {}
  currentUser;
  token;
  isLogin;

  async ngOnInit() {
    this.token = this.authService.loadToken();
    this.currentUser = helper.decodeToken(this.token);
    this.titleService.setTitle(this.title);

    if (this.token) {
      (await this.authService.islogged()).subscribe(res => {
        this.isLogin = res;
      });
    }
  }

  async createPost() {
    // if (!this.content || !this.heading || this.subHeading || this.category) {
    //   this.valid = false;
    // } else {

    if (this.isLogin) {
      const data = {
        content: this.content,
        heading: this.heading,
        subHeading: this.subHeading,
        image: this.master.path,
        thumb: this.master.thumb,
        date: new Date().toISOString(),
        category: this.category,
        author: {
          author_name:
            this.currentUser.firstname + " " + this.currentUser.lastname
        },
        approve: false
      };
      this.created = true;
      const a = await this.blogService.addBlog(data).subscribe();
      console.log(a);
      setTimeout(() => {
        this.created = false;
        this.router.navigate(["/blogs"]);
      }, 3000);
    } else {
      window.alert(" Stop Using JWT TOKEN to login in !! ");
      localStorage.clear();
      this.router.navigate(["login"]);
    }

    // }
  }
  async uploadImage(event) {
    // if (this.isLogin) {

    //   const file = event.target.files[0];
    //   const path = `posts/${file.name}`;
    //   const fileRef = this.storage.ref(path);
    //   if (file.type.split("/")[0] !== "image") {
    //     return alert("Choose A Image File");
    //   } else {
    //     const task = this.storage.upload(path, file);
    //     this.uploadPer = task.percentageChanges();
    //     task
    //       .snapshotChanges()
    //       .pipe(
    //         finalize(() => {
    //           this.downloadURL = fileRef.getDownloadURL();
    //           this.downloadURL.subscribe(url => (this.image = url));
    //         })
    //       )
    //       .subscribe();
    //     console.log("Image Uploaded");
    //   }
    // }
    // else {
    //   window.alert(" Stop Using JWT TOKEN to login in !! ")
    //   localStorage.clear();
    //   this.router.navigate(["login"]);

    // }
    const file = event.target.files[0];
    const a = await this.blogService.uploadImage(file).subscribe();
    console.log(a);
  }

  async onSubmit(event) {
    console.log(event);
    const file = event.target.elements[0].files[0];
    console.log(file);
    await this.blogService.uploadImage(file).subscribe(item => {
      this.master = item;
    });
  }

  upload(event) {
    if (this.isLogin) {
      const file = event.target.files[0];
      console.log(event);
      if (file.type.split("/")[0] !== "image") {
        return alert("Choose A Image File");
      }
      let a = this.blogService.uploadImage(event.target.files[0]).subscribe();
      console.log(a);
    } else {
      window.alert(" Stop Using JWT TOKEN to login in !! ");
      localStorage.clear();
      this.router.navigate(["login"]);
    }
  }
}
