import { Component, OnInit } from "@angular/core";
import { BlogService } from "../services/blog.service"
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-view-gallery",
  templateUrl: "./view-gallery.component.html",
  styleUrls: ["./view-gallery.component.css"]
})
export class ViewGalleryComponent implements OnInit {
  title = "Gallery";
  items;
  api = 'http://localhost:3000';
  constructor(public blogService: BlogService, private titleService: Title) {}

  ngOnInit() {
    this.blogService.viewGallery().subscribe(item => {
      this.items = item;
    });

    this.titleService.setTitle(this.title);
  }
}
