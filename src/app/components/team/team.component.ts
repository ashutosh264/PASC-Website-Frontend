import { Component, OnInit } from '@angular/core';
import {ElementRef} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  title = 'Our Team'
  constructor(private elementRef:ElementRef,
    private titleService: Title) { }

  ngOnInit() {
    var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "../../../assets/scripts/AOS.js";
  this.elementRef.nativeElement.appendChild(s);


  this.titleService.setTitle(this.title);
  }

}
