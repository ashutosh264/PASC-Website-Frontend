import { Component, OnInit } from '@angular/core';
import { ElementRef } from "@angular/core";

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-achieve',
  templateUrl: './achieve.component.html',
  styleUrls: ['./achieve.component.css']
})
export class AchieveComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../../assets/scripts/AOS.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
