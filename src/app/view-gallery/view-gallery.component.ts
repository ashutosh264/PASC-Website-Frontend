import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../app/services/blog.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-gallery',
  templateUrl: './view-gallery.component.html',
  styleUrls: ['./view-gallery.component.css']
})
export class ViewGalleryComponent implements OnInit {

  title = 'Gallery'
  items;
  constructor(public blogService : BlogService,
    private titleService: Title) { }

  ngOnInit() {
    this.blogService.getImages().subscribe(item => {this.items = item});

    this.titleService.setTitle(this.title);
  }

}
