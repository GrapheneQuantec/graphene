import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Publication } from '../models/publication';
import 'rxjs/add/operator/map';

@Injectable()
export class DoiService {

  constructor(private _http: Http) { }

  getPublicationByDoi(doi: string): Observable<Publication> {
    return this._http
      .get('https://api.crossref.org/v1/works/http://dx.doi.org/' + doi)
      .map((response: Response) => <Publication> response.json());
  }

}
