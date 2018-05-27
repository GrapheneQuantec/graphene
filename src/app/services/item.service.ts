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
  afs$: AngularFirestore;
  
  constructor(public afs: AngularFirestore) { 
    this.afs$ = afs;
    this.getItems();
  }

  sortCollection(sortName: string, isAscending: boolean) {

    var order:any = (isAscending) ? 'asc' : 'desc';

    this.itemsCollection = this.afs$.collection<Item>('Literature' , ref => ref.orderBy(sortName, order));
    this.items = this.itemsCollection.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      })
    })

    return this.items;
  }


  getItems(category?: string, step?: string){
    if(category && category != 'All') {
      if(step && step != 'All') {
        this.itemsCollection = this.afs$.collection<Item>('Literature', ref => ref.where("Category", "==", category).where("Step", "==", step));
      }
      else {
        this.itemsCollection = this.afs$.collection<Item>('Literature', ref => ref.where("Category", "==", category));
      }
    }
    else {
      this.itemsCollection = this.afs$.collection<Item>('Literature');
    }
    this.items = this.itemsCollection.snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      })
    })
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

