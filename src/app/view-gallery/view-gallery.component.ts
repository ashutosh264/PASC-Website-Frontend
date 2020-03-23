import { Component, OnInit } from "@angular/core";
import { BlogService } from "../services/blog.service"
import { Title } from "@angular/platform-browser";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-view-gallery",
  templateUrl: "./view-gallery.component.html",
  styleUrls: ["./view-gallery.component.css"]
})
export class ViewGalleryComponent implements OnInit {
  title = "Gallery";
  items;
  api = environment.port;
  constructor(public blogService: BlogService, private titleService: Title) {}

  ngOnInit() {
    this.blogService.viewGallery().subscribe(item => {
      this.items = item;
    });

    this.titleService.setTitle(this.title);
  }
}
