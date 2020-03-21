import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  result;
  User;

  constructor(public authService : AuthService,
    private titleService: Title) { }

    title= 'Profile';
  ngOnInit() {

    this.authService.getUser().subscribe( res=>{
      this.result=res
      this.User = this.result.user;
      this.titleService.setTitle(this.User.firstname + " " + this.User.lastname);

    } )

  
   
    console.log(this.title);
  }

  

}
