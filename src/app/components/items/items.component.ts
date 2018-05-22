import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

// import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  editState: boolean = false;
  isAbstract: boolean = false;
  isDescription: boolean = false;
  isNewlyAdded: boolean = false;
  itemToEdit: Item;
  activeItemId: string;

  constructor(
    private itemService: ItemService
    // private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  sortBy(sortName: string) {
    this.itemService.sortCollection(sortName);
  }

  showAbstract() {
    this.isAbstract = true;
    this.isDescription = false;
  }
  
  showDescription() {
    this.isAbstract = false;
    this.isDescription = true;
  }

  activate(item: Item) {

    if(this.activeItemId != item.id) {
      if(this.isNewlyAdded) {

        if(confirm("Are you sure to delete " + this.activeItemId)) {
          var itemToDelete = this.items.filter(x => x.id === this.activeItemId)[0];
          this.deleteItem(itemToDelete);
          this.isNewlyAdded = false;
        }
        else {
          return;
        }

        // let dialogRef = this.dialog.open(UserProfileComponent, {
        //   height: '400px',
        //   width: '600px',
        // });
      }
      this.activeItemId = item.id;
      this.isAbstract = true;
      this.clearState();
    }
  }

  addItem() {
    var item: Item = {
      Author: '',
      Title: '',
      Year: 2018
    }

    this.itemService.addItem(item).then( (doc: Item) =>{
      this.isNewlyAdded = true;
    this.editState = true;
    this.activeItemId = doc.id;
    });
  }

  editItem(event, item: Item) {
    this.editState = true;
    this.activeItemId = item.id;
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.isNewlyAdded = false;
    this.clearState();
  }

  clearState() {
    this.editState = false;
  }

  deleteItem(item: Item) {
    this.clearState();
    this.itemService.deleteItem(item);
  }

}
