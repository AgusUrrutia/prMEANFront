import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from './people';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicePeopleService {
  public URL: string;
  constructor( 
    private http: HttpClient
  ) {

    this.URL = 'https://prmean-mgsb-dev.fl0.io/get-people';
   }

  public getPeople() : Observable<People[]>{
    return this.http.get<People[]>(this.URL);
  }

}
