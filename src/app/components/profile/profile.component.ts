import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { JwtHelperService } from "@auth0/angular-jwt";


const helper = new JwtHelperService();


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token;
  result;
  User;

  constructor(public authService : AuthService,
    private titleService: Title) { }

    title= 'Profile';
  ngOnInit() {

    //   this.authService.getUser().subscribe( res=>{
    //   this.result=res
    //   this.User = this.result.user;
    //   

    // } )

    this.token = this.authService.loadToken()
    this.User = helper.decodeToken(this.token);
    this.titleService.setTitle(this.User.firstname + " " + this.User.lastname);
    
   
  }

  

}
