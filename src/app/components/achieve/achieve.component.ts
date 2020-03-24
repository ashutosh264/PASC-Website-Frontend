import { Component, OnInit } from '@angular/core';
import { ElementRef } from "@angular/core";
import { BlogService } from "../../services/blog.service";

import { EventService } from '../../services/event.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-achieve',
  templateUrl: './achieve.component.html',
  styleUrls: ['./achieve.component.css']
})
export class AchieveComponent implements OnInit {
  title = 'Achievements'

  constructor(private elementRef: ElementRef,
    private blogService: BlogService,
    private titleService: Title) { }
    projects;
    mpro;
  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../../assets/scripts/AOS.js";
    this.blogService.getProjects().subscribe(item => {
      this.projects = item
    });
    this.elementRef.nativeElement.appendChild(s);
    this.titleService.setTitle(this.title);
  }
  passData(pro) {
    this.mpro = pro
  }
}
