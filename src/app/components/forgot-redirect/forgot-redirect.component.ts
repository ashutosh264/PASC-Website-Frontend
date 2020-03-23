import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-redirect',
  templateUrl: './forgot-redirect.component.html',
  styleUrls: ['./forgot-redirect.component.css']
})
export class ForgotRedirectComponent implements OnInit {
  success = false;
  formMode = true;
  hide = true;
  loading = true;
  email;
  id = null;
  alertOccur = false;
  constructor(private authService : AuthService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.extractIdParam();
  }
  extractIdParam(){
    this.route.paramMap.subscribe(value =>{
      this.id = value.get('id');
      this.verifyCorrectId(this.id);
      this.verifyForgotUrl(this.id);
    })
  }

  //verfies if the id is corrent or not
  verifyCorrectId(id){
    this.authService.checkId(id).subscribe(res =>{
      if(!res['email']){
        window.alert('Incorrect Url Or the link has expired');
        this.alertOccur = true;
        this.router.navigate(['/signup'])
      }
      else{
        this.email = res['email']
        this.loading = false;
      }
    })
  }

  async verifyForgotUrl(id){
    this.authService.verifyTokenExpiry(id)
    .subscribe(res =>{
      if(res['message'] == 'success'){
        this.success = true;
      }
    },err =>{
      if(!this.alertOccur){
        window.alert('The link has expired')
        this.router.navigate(['forgot']);
      }
      else{
        this.router.navigate(['signup']);
      }
    })
  }
  
  async onReset(pass){
    this.loading = true;
    if(this.success){
      this.authService.sendNewPassword(pass,this.id).subscribe(res =>{
        this.loading = false;
        this.formMode = false;
      },err=>{
        this.success = false;
        this.formMode = false;
        this.loading = false;
      })
    }
    else{
      this.loading = false;
      this.formMode = false;
    }
  }

}
