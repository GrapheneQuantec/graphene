import { Component, OnInit } from '@angular/core';
import { DoiService } from '../../services/doi.service'
import { Publication } from '../../models/publication';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  publications: Publication

  constructor(private _doiService: DoiService ) { }

  ngOnInit() {
    this.getPublications();
  }

  getPublications() {
    this._doiService.getPublicationByDoi('10.1016/j.exer.2018.05.010').subscribe((publication: Publication) => {
      console.log('publications', publication.status);
      this.publications = publication});
  }

}
