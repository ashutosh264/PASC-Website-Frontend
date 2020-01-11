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
  }
}
