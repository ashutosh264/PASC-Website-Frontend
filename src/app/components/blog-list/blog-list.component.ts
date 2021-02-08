import { Component, OnInit } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.css"]
})
export class BlogListComponent implements OnInit {
  title = "PASC-Blogs";

  blogs;
  constructor(private blogService: BlogService, private titleService: Title) {}


  ngOnInit() {
    this.blogService.getBlogs().subscribe(item => {
      this.blogs = item;
      console.log(this.blogs) 
    });

    this.titleService.setTitle(this.title);
  }
}
