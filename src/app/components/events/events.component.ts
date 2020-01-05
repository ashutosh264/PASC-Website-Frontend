import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {ElementRef} from '@angular/core';
import {EventService } from '../../services/event.service';
import {Params, Router,ActivatedRoute} from '@angular/router';
import {Event} from '../../shared/event';
import{UpcomingService} from '../../services/upcoming.service';
import { Upcoming } from 'src/app/shared/events';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[];
  event: Event;

  upcomings: Upcoming[];
  upcoming: Upcoming;

  

  constructor(private elementRef:ElementRef,
    public eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    public upcomingService: UpcomingService) { }

  ngOnInit() {
    var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "../../../assets/scripts/AOS.js";
  this.elementRef.nativeElement.appendChild(s);

  this.eventService.getEventsFromFirestore().subscribe(items =>{this.events = items});
  this.upcomingService.getEventFromFirestore().subscribe(item => {this.upcomings = item});
  }

  
}
