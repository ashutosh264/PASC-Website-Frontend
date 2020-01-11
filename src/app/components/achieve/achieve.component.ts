import { Component, OnInit } from '@angular/core';
import { ElementRef } from "@angular/core";

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
    private titleService: Title) { }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../../assets/scripts/AOS.js";
    this.elementRef.nativeElement.appendChild(s);
    this.titleService.setTitle(this.title);
  }

}
