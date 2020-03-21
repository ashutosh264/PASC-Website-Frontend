import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DOCUMENT } from '@angular/common';
import {ElementRef} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
    
   });

  authError : any;
  clicked = false;
  result;
  signed:Boolean;
  constructor(public authService : AuthService,public router: Router, private elementRef:ElementRef ,  private titleService: Title)  { }

  ngOnInit() {
    
    this.authService.eventAuthError$.subscribe( data => {
      this.authError = data;

      this.titleService.setTitle("Login");
    })
    this.signed=false
    // this.clicked=false;
    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../../../assets/scripts/login.js";
    // this.elementRef.nativeElement.appendChild(s);
  }
  
  async login() {
    this.signed=true
   await this.authService.loginUser(this.form.value ).subscribe(
     res =>{
     this.result = res;
     if(!this.result.error){
       window.alert("Login Succesfull !!")
      this.router.navigate(['blogs']);
     }
    else{
      window.alert(this.result.error)
      this.signed=false
      this.form.reset();
    }
   });
 
  }
}
