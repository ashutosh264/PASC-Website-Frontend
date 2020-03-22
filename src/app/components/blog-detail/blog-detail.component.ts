import { Component, OnInit } from "@angular/core";
import { Blog } from "src/app/shared/blog";
import { BlogService } from "src/app/services/blog.service";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../../services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

const helper = new JwtHelperService();

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.css"]
})
export class BlogDetailComponent implements OnInit {
  blog;
  currentUser: any;
  admin: boolean;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private titleService: Title,
    public authService: AuthService,
    public router: Router
  ) {}
  token;

  ngOnInit() {
    // this.token = this.authService.loadToken();
    // this.currentUser = helper.decodeToken(this.token);
    // this.admin = this.currentUser.admin;

    const id = this.route.snapshot.params["id"];
    this.blog = this.blogService.getSelectedBlog(id).subscribe(data => {
      this.blog = data;
      console.log("data fethced");
      this.titleService.setTitle(this.blog.heading);
    });
  }
  markCompleted(id: string) {
    this.blogService.approveBlog(id).subscribe(res => {
      this.router.navigate(["reviewblogs"]);
    });
  }
  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe();
  }
}
