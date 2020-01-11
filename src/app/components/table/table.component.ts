import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router } from '@angular/router';
import{EventService} from  '../../services/event.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Time } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  date: string;
  activity: string;
  attendees: number;
  details:string;
  speaker: string;
  datep: string;
  created: boolean;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public eventService:EventService,
    private storage : AngularFireStorage,public authService : AuthService , public angularFireAuth : AngularFireAuth,private db: AngularFirestore
  ) { }

  ngOnInit() {
    
  }

  createEvent() {
    const data = {
      date: this.date,
      activity: this.activity,
      attendees: this.attendees,
      details: this.details,
      speaker: this.speaker,
      datep: this.datep,
    };

    this.created = true;
    this.eventService.createE(data)
    setTimeout(() => {
      this.created = false;
      this.router.navigate(['/events']);
    },3000);
  }


  }




