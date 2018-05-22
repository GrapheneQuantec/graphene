import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item: Item = {
    Author: '',
    Title: '',
    Year: 2018
  }

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.item.Title != '' && this.item.Author != '')
    {
      this.itemService.addItem(this.item);
      this.item.Author = '';
      this.item.Title = '';
      this.item.Year = 2018;
    }
  }

}
