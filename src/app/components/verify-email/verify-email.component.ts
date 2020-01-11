import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  title = 'Verify Email'

  constructor(private titleService: Title) { }

  ngOnInit() {

    this.titleService.setTitle(this.title);


  }

}
