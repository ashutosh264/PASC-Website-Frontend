import { Component, OnInit } from '@angular/core';
import {ElementRef} from '@angular/core';
import { BlogService } from '../../services/blog.service'
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Title, Meta } from '@angular/platform-browser';

export interface FormModel {
  captcha?: string;
}


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  title= 'About Us';

  name : string;
  email : string;
  subject: string;
  text : string;

  public formModel: FormModel = {};

  constructor(private blogService : BlogService, private storage : AngularFireStorage,public authService : AuthService , public router : Router , private elementRef:ElementRef,
    private titleService: Title,
    private meta: Meta) { }



  ngOnInit() {
    var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "../../../assets/scripts/AOS.js";
  this.elementRef.nativeElement.appendChild(s);

  this.titleService.setTitle(this.title);
  
  
  }

  async createFeed()
  {
    const data = {
      name : this.name,
      email : this.email,
      subject : this.subject,
      text : this.text
    };
    console.log(data);
    let a = this.blogService.createFeed(data).subscribe();
    console.log(a);
    setTimeout(() => {
      window.alert("Feedback Received")
      window.location.href="/"
    }, 1000);
  }



}
