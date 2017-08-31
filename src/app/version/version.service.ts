import { Injectable } from '@angular/core';
import { Version } from '../shared/version';

import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class VersionService {

  constructor(private http: Http) { }

  getVersionDetails(url: string)  {
    return this.http.get(url)
   .map((res: Response) => { return res.json();});
  }
}
