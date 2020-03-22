import { Component, OnInit } from '@angular/core';
import { Blog } from '../../shared/blog'
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs'
import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  blogs : Blog[]
  constructor(public afs: AngularFirestore,public authService : AuthService, public angularFireAuth : AngularFireAuth) { }
  User;
  currentUser : any
  item: any;
  token;
  ngOnInit() {
  
    this.token = this.authService.loadToken()
    this.currentUser = helper.decodeToken(this.token);
  
    
  }
  



}
