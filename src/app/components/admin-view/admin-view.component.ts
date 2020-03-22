import { Component, OnInit } from '@angular/core';
import {EventService } from '../../services/event.service';
import {Params, Router,ActivatedRoute} from '@angular/router';
import { Blog } from '../../shared/blog'
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs'
import { UpcomingService } from 'src/app/services/upcoming.service';
import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  topic: string;
  description: string;
  date: string;
  created: boolean;

  constructor(
    public eventService: EventService,
    private router: Router,
    public upcomingService: UpcomingService,
    private route: ActivatedRoute,
    public afs: AngularFirestore,public authService : AuthService, public angularFireAuth : AngularFireAuth
  ) { }
currentUser:any;

token;
  ngOnInit() {
  
    this.token = this.authService.loadToken()
    this.currentUser = helper.decodeToken(this.token);
    // setTimeout(() => {
    //   this.getAdmin()
     
    // }, 1000);
   
  }

  async createUpcoming() {
    const data = {
      topic: this.topic,
      date: this.date,
      description: this.description
    };

    this.created= true;
   const a = await this.upcomingService.createE(data).subscribe()
   console.log(a)
    setTimeout(() => {
      this.created = false;
      this.router.navigate(['/events'])
    },3000);
  }
 
  getAdmin()
  {
    this.afs.doc(`users/${this.angularFireAuth.auth.currentUser.uid}`).valueChanges().subscribe(item => {this.currentUser = item})

  }
  

}
