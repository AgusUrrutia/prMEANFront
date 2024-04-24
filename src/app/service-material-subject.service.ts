import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from './material';

@Injectable({
  providedIn: 'root'
})
export class ServiceMaterialSubjectService {
  public URL: string;
  constructor( 
    private http: HttpClient
  ) {
    this.URL = 'https://prmean.onrender.com';
   }


  get(num : number, subject: String): Observable<Material[]>{

    return this.http.get<Material[]>(`${this.URL}/get-material/${subject}/${num}`); 
  }
}
