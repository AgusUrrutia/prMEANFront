import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from './people';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ServicePeopleService {
  
  
  
  public URL: string;
 
  constructor( 
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.URL = 'https://prmean-mgsb-dev.fl0.io';
   }

  getPeople() : Observable<People[]>{
    const token = localStorage.getItem('token') || "";
 
    const headers = new HttpHeaders({
      "Authorization" : token
    })  
    return this.http.get<People[]>(`${this.URL}/get-people`,{headers});
  }


  register(listUser:{}) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.post(`${this.URL}/register-people`,listUser,{headers})
  }

  login(listUser:{}){
    console.log(listUser);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(`${this.URL}/login-people`,listUser,{headers})

  }
  

}
