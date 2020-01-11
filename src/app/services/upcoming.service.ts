import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Event} from '../shared/event';
import { Upcoming } from '../shared/events';

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
    public router : Router) {
      this.itemsCollection = this.db.collection('events',ref=> ref.orderBy("date","desc"))
     }

     getEventFromFirestore() {
      this.items = this.db.collection('events',ref => ref.orderBy('date')).snapshotChanges().pipe(
        map(changes => {
          return changes.map(a=> {
            const data = a.payload.doc.data() as Upcoming
            data.id = a.payload.doc.id;
            return data;
          })
        })
      )
      console.log(this.items);
      return this.items;
    }

    createE(data: Upcoming) {
      this.itemsCollection.add(data);
    }

    provideId(id : string)
    {
      this.itemDoc = this.db.doc<Upcoming>('events/' + id);
      this.itemDoc.update({id : id})
    }

    getSelectedEvents(id : string){
      this.itemDoc = this.db.doc<Upcoming>(`events/${id}`);
      return this.itemDoc.valueChanges()
    }


    delete(id : string)
    {
      this.itemDoc = this.db.doc<Upcoming>(`events/${id}`);
      this.itemDoc.delete();
      this.router.navigate(['events']);
    }
    
}
