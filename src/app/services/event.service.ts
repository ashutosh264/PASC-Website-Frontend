import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Event} from '../shared/event';
import { Upcoming } from '../shared/events';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
};

const httpAdminOptions = { 
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  itemsCollection : AngularFirestoreCollection<Event>
  items : Observable<Event[]>
  itemDoc : AngularFirestoreDocument<Event>
  Galleryitems : any 
  approveEvent : AngularFirestoreDocument<Event>
  feedback: any;

  api = environment.port

  constructor(
    public db: AngularFirestore,
    public router : Router,
    private http: HttpClient
  ) {
    this.itemsCollection = this.db.collection('event',ref=> ref.orderBy("datep","desc"))

   }

  getEventsFromFirestore() {
    return this.http.get(`${this.api}/api/events`);
  }



createE(data: Event) {
  return this.http.post(`${this.api}/api/events`, data,httpAdminOptions)
}



}
