import { Injectable } from '@angular/core';
import {Headers, Http, Request, RequestMethod, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx'
import 'rxjs';
import {eVars} from './streams.interface';
import {Props} from './streams.interface';
import {Events} from './streams.interface';
import {Users} from './streams.interface';

@Injectable()
export class StreamsService {

  constructor(private _http: Http) { }


  // service to get Evars
  getEvars(): Observable<eVars> {
    return this._http.get('./app/components/streampg/data/evars.json')
      .flatMap((response) => response.json())
      .filter((evar: eVars) => evar.enabled === true && evar.expiration_type === 'visit')
    // .filter(this.isEnabled)
  }

  getUsers(): Observable<any> {
    return this._http.get('http://jsonplaceholder.typicode.com/users/')
      .flatMap((response) => response.json())
      .filter((person: Users) => person.id > 5)
      .map((person: Users) => "Dr. " + person.name)
  }
}
