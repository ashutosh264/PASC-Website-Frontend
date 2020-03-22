import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Event} from '../shared/event';
import { Upcoming } from '../shared/events';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type " : "application/json"
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
export class UpcomingService {

  itemsCollection : AngularFirestoreCollection<Upcoming>
  items : Observable<Upcoming[]>
  itemDoc : AngularFirestoreDocument<Upcoming>
  Galleryitems : any 
  approveEvent : AngularFirestoreDocument<Upcoming>
  feedback: any;
  constructor( public db: AngularFirestore,
    public router : Router,
    private http: HttpClient) {
     }

     api = environment.port

     getEventFromFirestore() {
     return this.http.get(`${this.api}/api/upcoming`);
    }

    createE(data: Upcoming) {
     return this.http.post(`${this.api}/api/upcoming`,data,httpAdminOptions)
    }

  

    getSelectedEvents(id : string){
      return this.http.get(`${this.api}/api/upcoming/eventsd/${id}`)
    }


    delete(id : string)
    {
      return this.http.delete(`${this.api}/api/upcoming/${id}`)
    }
    
}
