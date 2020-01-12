import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Title, Meta} from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pasc-blogs';
  constructor(public router:Router,
     private titleService: Title,
     private meta: Meta) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.meta.updateTag({name: 'keywords', content: 'PICT ACM Student Chapter' });
    this.meta.updateTag({name: 'description',content:'PICT ACM Student Chapter is a dynamic body of over 300 highly motivated registered members and over 1000 active contributors.'});
    this.meta.addTag({name: 'author', content:'PASC WEB Team'})
  }
}
