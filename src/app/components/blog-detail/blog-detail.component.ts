import { Component, OnInit } from "@angular/core";
import { Blog } from "src/app/shared/blog";
import { BlogService } from "src/app/services/blog.service";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.css"]
})
export class BlogDetailComponent implements OnInit {
  blog;
  currentUser: any;
  admin :boolean = true;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.blog = this.blogService.getSelectedBlog(id).subscribe(data => {
      this.blog = data;
      console.log('data fethced');
      this.titleService.setTitle(this.blog.heading);
    });
  }
  markCompleted(id: string) {
    this.blogService.approveBlog(id).subscribe();  
  }
  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe();
  }
}
