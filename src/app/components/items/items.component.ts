import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { DoiService } from '../../services/doi.service'
import { Item } from '../../models/item';
import { Publication } from '../../models/publication';

// import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';

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
  user;
  isAscending: boolean;
  showSteps: boolean = false;
  steps: any;
  doi: string;
  citedAuthor: string;

  categories = [
    { name: "All" },
    { name: "Quantum Foundation" },
    { name: "Graphene" }
  ];
  QFSteps = [
    { name: "All" },
    { name: "Photon resonances" },
    { name: "GravitoElectroMagnetism" },
    { name: "3D holograms" },
    { name: "Quantum Brain Computers" },
    { name: "Multi Unit Activity" },
    { name: "Brain Computer Interfaces" }
  ];
  grapheneSteps = [
    { name: "All" },
    { name: "Electrotribology" },
    { name: "Electrochemistry" },
    { name: "Structural" }
  ];
  selectedCategory: string;
  selectedStep: string;

  constructor(
    private itemService: ItemService,
    private doiService: DoiService,
    public authService: AuthService
    // private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user
      this.getItems();
    });
  }

  getRole() {
    if (this.user.roles.admin == true) return 'an admin';
    if (this.user.roles.author == true) return 'an author';
    if (this.user.roles.reader == true) return 'a reader';
    return 'unknown'
  }

  getItems() {
    this.itemService.getItems(this.selectedCategory, this.selectedStep).subscribe(items => {
      this.items = items;
    });
  }

  sortBy(sortName: string) {
    this.isAscending = !this.isAscending;
    this.itemService.sortCollection(sortName, this.isAscending).subscribe(items => {
      this.items = items;
    });
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

    if (this.activeItemId != item.id) {
      if (this.isNewlyAdded) {

        if (confirm("Are you sure to delete " + this.activeItemId)) {
          var itemToDelete = this.items.filter(x => x.id === this.activeItemId)[0];
          this.deleteItem(itemToDelete);
          this.isNewlyAdded = false;
        }
        else {
          return;
        }
      }
      this.activeItemId = item.id;
      this.isAbstract = true;
      this.clearState();
    }
  }

  closeItem(event) {
    event.stopPropagation();
    this.activeItemId = null;
  }

  addItemFromDoi() {

    // this.doi = '10.1016/j.exer.2018.05.010';

    this.doiService.getPublicationByDoi(this.doi).subscribe((publication: Publication) => {

      // get the first author from the authors array
      var author = (publication.message.author && publication.message.author.length > 0)
        ? publication.message.author[0].family + ', ' + publication.message.author[0].given : '';
      // if there are more than one author then add et al.
      var etAl = (publication.message.author && publication.message.author.length > 1) ? ', et al.' : '';

      var item: Item = {
        Link: publication.message.URL,
        Authors: publication.message.author,
        Author: author + etAl,
        Title: publication.message.title,
        Issued: publication.message.issued["date-parts"][0],
        Inserted: {
          InsertorId: this.user.uid,
          Timestamp: Date.now()
        }
        // Year: publication.message.created
      }
      this.addItem(item);
    });
  }

  addDefaultItem() {
    var item: Item = {
      Author: '',
      Title: [],
      Year: 2019,
      Inserted: {
        InsertorId: this.user.uid,
        Timestamp: Date.now()
      }
    }

    this.addItem(item);
  }

  addItem(item) {

    this.itemService.addItem(item).then((doc: Item) => {
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
    this.isNewlyAdded = false;
    this.clearState();
    this.itemService.deleteItem(item);
  }

  chooseCategory() {
    if (this.selectedCategory != "All") {
      this.showSteps = true;
      if (this.selectedCategory == "Quantum Foundation") {
        this.steps = this.QFSteps;
      }
      if (this.selectedCategory == "Graphene") {
        this.steps = this.grapheneSteps;
      }
    }
    else {
      this.showSteps = false;
    }
    this.getItems();
  }
}
