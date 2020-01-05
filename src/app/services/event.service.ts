import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Event} from '../shared/event';
import { Upcoming } from '../shared/events';
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

  constructor(
    public db: AngularFirestore,
    public router : Router
  ) {
    this.itemsCollection = this.db.collection('event',ref=> ref.orderBy("date","desc"))


   }

  getEventsFromFirestore() {
    this.items = this.db.collection('event',ref => ref.orderBy("date","desc")).snapshotChanges().pipe(
      map(changes => {
        return changes.map(a=> {
          const data = a.payload.doc.data() as Event
          data.id = a.payload.doc.id;
          return data;
        })
      })
    )
    console.log(this.items);
    return this.items;
  }

createE(data: Event) {
  this.itemsCollection.add(data);
}



}
