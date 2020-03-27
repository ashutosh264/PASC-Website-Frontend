import { Component, OnInit, Input } from "@angular/core";
import { Blog } from "src/app/shared/blog";
import { ElementRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { environment } from "../../../environments/environment";


@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  @Input()
  blog;
  
  // api = environment.port;
  api = 'http://localhost:3000/thumbnail/image'

  constructor(private elementRef: ElementRef, private titleService: Title) {}

  ngOnInit() {
    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "../../../assets/scripts/AOS.js";
    this.elementRef.nativeElement.appendChild(s1);
    this.titleService.setTitle("Blogs");
  }
}
