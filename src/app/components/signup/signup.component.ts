import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';


export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  title= 'Sign Up'

  public formModel: FormModel = {};
  
  constructor(public authService : AuthService,
    private titleService: Title) { }
  authError: any;

  ngOnInit() {
    this.authService.eventAuthError$.subscribe( data => {
      this.authError = data;
    })


    this.titleService.setTitle(this.title);
  }
  createUser(frm) {
    this.authService.createUser(frm.value);
  }
}
