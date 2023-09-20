import { HttpClient , HttpHeaders} from '@angular/common/http';
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

    this.URL = 'https://prmean-mgsb-dev.fl0.io';
   }

  getPeople() : Observable<People[]>{
    return this.http.get<People[]>(`${this.URL}/get-people`);
  }

  sendUser(listUser:{}) {
    console.log(listUser);
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.post(`${this.URL}/post-people`,listUser,{headers})
  }

}
