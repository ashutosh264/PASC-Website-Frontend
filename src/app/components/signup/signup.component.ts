import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    captcha: new FormControl('', Validators.required),
    
   });

  title= 'Sign Up'
result
signed:Boolean;
  public formModel: FormModel = {};
  
  constructor(public authService : AuthService,
    private titleService: Title , public router: Router,

    ) { }
  authError: any;

  ngOnInit() {
    this.authService.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
    this.signed=false
    this.titleService.setTitle(this.title);
  }

 async createUser() {
   this.signed=true;

   await this.authService.signUpUser(this.form.value ).subscribe(
     res =>{
     this.result = res;
     if(this.result.user){
      window.alert("SIGN UP SUCCESSFULL !!")
      this.router.navigate(['verify']);
     }
    else{
      window.alert(this.result.error)
      this.signed=false;
      this.form.reset();
      this.form.reset();
    }
   });
 
  }
}
