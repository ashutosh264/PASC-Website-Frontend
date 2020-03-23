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
  currentUser ;
  item: any;
  token
  isAdmin;
  async ngOnInit() {
   
     this.token = this.authService.loadToken()
    this.currentUser=false;

    if (this.token) {
      (await this.authService.isadmin()).subscribe(res => {
        this.isAdmin = res
        this.currentUser = this.isAdmin.admin
      })
    }
    
  }
  



}
