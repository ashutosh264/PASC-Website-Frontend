import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  title = 'Forgot-Password'
  loading = false;

  constructor(public authService : AuthService,
    private titleService: Title,private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
   }

  onClickReset(email){
    this.loading = true
    this.authService.forgotPassword(email)
    .subscribe(res =>{
      // console.log(res);
      this.loading = false
      window.alert(res['message']);
      this.router.navigate(['/login']);
    },err =>{
      this.loading = false;
      window.alert(err.error.message);
    })
  }

}
