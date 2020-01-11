import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  title = 'Forgot-Password'

  constructor(public authService : AuthService,
    private titleService: Title) { }

  ngOnInit() {

    this.titleService.setTitle(this.title);
  }

}
