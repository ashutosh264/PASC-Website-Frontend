import { Component, OnInit } from '@angular/core';
import { Blog } from '../../shared/blog';
import { BLOGS } from '../../shared/blogsData';
import { Observable } from 'rxjs'
import { BlogService } from '../../services/blog.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
 
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  title = 'PASC-Blogs'
  
  blogs : Blog[];
  constructor(private blogService : BlogService,
    private titleService: Title) { }

  ngOnInit() {
    this.blogService.getBlogsFromFirestore().subscribe(item => {this.blogs = item});

    this.titleService.setTitle(this.title);
}
}
