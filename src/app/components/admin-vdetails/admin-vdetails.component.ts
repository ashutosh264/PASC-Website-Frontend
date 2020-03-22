import { Component, OnInit } from '@angular/core';
import  {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {EventService} from '../../services/event.service';
import { Router } from '@angular/router';
import { Blog } from '../../shared/blog'
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs'
import { UpcomingService } from 'src/app/services/upcoming.service';
import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();

@Component({
  selector: 'app-admin-vdetails',
  templateUrl: './admin-vdetails.component.html',
  styleUrls: ['./admin-vdetails.component.css']
})
export class AdminVdetailsComponent implements OnInit {
  upcoming: any;
  constructor(
    public eventService: EventService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public afs: AngularFirestore,public authService : AuthService, public angularFireAuth : AngularFireAuth,
    public upcomingService: UpcomingService
  ) { }


  currentUser : any
  token;
  ngOnInit() {
  
    this.token = this.authService.loadToken()
    this.currentUser = helper.decodeToken(this.token);
    
    const id = this.route.snapshot.params["id"];
    this.upcoming = this.upcomingService.getSelectedEvents(id).subscribe(data => this.upcoming = data);
   

    // setTimeout(() => {
    //   this.getAdmin()
     
    // }, 1000);


  }

  deleteEvent(id) {
    this.upcomingService.delete(id).subscribe();
    this.router.navigate(['events']);
  }

  getAdmin()
  {
    this.afs.doc(`users/${this.angularFireAuth.auth.currentUser.uid}`).valueChanges().subscribe(item => {this.currentUser = item})

  }
  

}
