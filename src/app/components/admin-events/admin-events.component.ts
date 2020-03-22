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
import { Upcoming } from 'src/app/shared/events';
import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();


@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  upcomings: Upcoming[];
  upcoming: Upcoming;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public eventService:EventService,
    public upcomingService: UpcomingService,
    private storage : AngularFireStorage,public authService : AuthService , public angularFireAuth : AngularFireAuth,private db: AngularFirestore
  ) { }
  currentUser;
  token
  ngOnInit() {
   
     this.token = this.authService.loadToken()
    this.currentUser = helper.decodeToken(this.token);
    this.upcomingService.getEventFromFirestore().subscribe(item => {this.upcomings = item});
  }

  getAdmin()
  {
    this.db.doc(`users/${this.angularFireAuth.auth.currentUser.uid}`).valueChanges().subscribe(item => {this.currentUser = item})

  }

}
