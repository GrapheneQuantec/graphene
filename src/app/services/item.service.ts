import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/item';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import * as Rx from 'rxjs';
// import { switchMap } from 'rxjs/operators';

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  items$: Observable<Item[]>;
  year$: BehaviorSubject<string|null>;
  
  constructor(public afs: AngularFirestore) { 
    // afs.firestore.settings({ timestampsInSnapshots: true });

//     var clicks = Rx.Observable.fromEvent(document, 'click');
//     var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
//     result.subscribe(x => console.log(x));

// var mar = firebase.firestore.CollectionReference;
// console.log("mar ", mar);

//     const year$ = new BehaviorSubject(null);
//     this.items = Observable.combineLatest(
//       this.year$
//     ).switchMap(year =>
//       afs.collection<Item>('Literature', ref => {
//         let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
//         if (year) { query = query.orderBy("Year", 'desc') };
//         return query;
//       }).valueChanges()
//     );

//     // , ref => ref.orderBy("Year", 'desc')

//     console.log("this.items: ", this.items);

    // this.sizeFilter$ = new BehaviorSubject<string>(null);
    // this.colorFilter$ = new BehaviorSubject<string>(null);
    // this.items$ = Observable.combineLatest(
    //   this.sizeFilter$,
    //   this.colorFilter$
    // ).switchMap(([size, color]) => 
    //   afs.collection('items', ref => {
    //     let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
    //     if (size) { query = query.where('size', '==', size) };
    //     if (color) { query = query.where('color', '==', color) };
    //     return query;
    //   }).valueChanges()
    // );

  //   this.items= afs.collection<Item>('Literature').valueChanges();
  // console.log("this.items2: ", this.items);
  

  this.itemsCollection = afs.collection<Item>('Literature'); // sort: , ref => ref.orderBy("Year", 'desc')
  
      this.items = this.itemsCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        })
      })
}

  

  sortCollection(sortName: string) {
    console.log("this.itemsCollection before", this.itemsCollection);
    this.itemsCollection.ref.orderBy(sortName, 'desc');
    console.log("this.itemsCollection after", this.itemsCollection);
    this.items = this.itemsCollection.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      })
    })
  }

  getItems(){
    return this.items;
  }

  addItem(item: Item){
    let promise = new Promise((resolve, reject) => {
      this.itemsCollection.add(item)
      .then((data) => { resolve(data); })
      .catch(error => reject(error) );
    });
    return promise;
  }

  updateItem(item: Item) {
    this.itemDoc = this.afs.doc<Item>("Literature/" + item.id);
    this.itemDoc.update(item);
  }

  deleteItem(item: Item){
    this.itemDoc = this.afs.doc<Item>("Literature/" + item.id);
    this.itemDoc.delete();
  }
}

