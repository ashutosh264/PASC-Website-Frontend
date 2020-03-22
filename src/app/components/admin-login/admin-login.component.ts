import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DOCUMENT } from '@angular/common';
import {ElementRef} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
    

    this.signed=false
    this.titleService.setTitle("Login");
   
  }
  
  async login() {
    this.signed=true
   await this.authService.loginUser(this.form.value ).subscribe(
     res =>{
     this.result = res;
     if(!this.result.error && this.result.user.admin){
       console.log(this.result.token.toString())

       this.authService.storeToken( this.result.token )

      setTimeout(() => {
        this.router.navigate(['adminPanel']);
      }, 1000);
     }
    else{
      window.alert(this.result.error)
      this.signed=false
      this.form.reset();
    }
   });
 
  }


 


}

