import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router, ActivatedRoute } from '@angular/router';
import{EventService} from  '../../services/event.service';
import { Blog } from '../../shared/blog'
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs'
import { AngularFireStorage } from 'angularfire2/storage';
import { UpcomingService } from 'src/app/services/upcoming.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  topic: string;
  description: string;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public eventService:EventService,
    public upcomingService: UpcomingService,
    private storage : AngularFireStorage,public authService : AuthService , public angularFireAuth : AngularFireAuth,private db: AngularFirestore
  ) { }
  currentUser : any
  ngOnInit() {
   
    const id = this.route.snapshot.params['id'];
   
   
  }

 

}
