import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {




  constructor(public authService : AuthService,
    private titleService: Title) { }

    title= 'Profile';
  ngOnInit() {
    setTimeout(() => {
      this.titleService.setTitle(this.authService.userData.displayName);
    }, 2000);
   
    console.log(this.title);
  }

  

}
