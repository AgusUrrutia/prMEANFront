import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from './people';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { Storage,ref, listAll, getDownloadURL,deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ServicePeopleService {
  
  
  
  public URL: string;
 
  constructor( 
    private http: HttpClient,
    private storage: Storage
  ) {
    this.URL = 'https://prmean-dev.3.us-1.fl0.io';
   }

  getPeople() : Observable<People[]>{
    const token = localStorage.getItem('token') || "";
 
    const headers = new HttpHeaders({
      "Authorization" : token
    })  
    return this.http.get<People[]>(`${this.URL}/get-people`,{headers});
  }


  deleteUser(id:String) : Observable<String>{
    const token = localStorage.getItem('token') || "";
    const headers = new HttpHeaders({
      "Authorization" : token
    });
    return this.http.delete<String>(`${this.URL}/delete-people/${id}`,{headers});
  }
  deleteImage(image: string) {
    // Obtén una referencia a la imagen que deseas eliminar
    const imageRef = ref(this.storage,'images/'+image);

    // Elimina la imagen
    deleteObject(imageRef).then(() => {
      console.log('Imagen eliminada correctamente.');
    }).catch(error => {
      console.error('Error al eliminar la imagen:', error);
    });
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
  editUser(listUser:People): Observable<String> {
    const token = localStorage.getItem('token') || "";
    const headers = new HttpHeaders({
      "Authorization" : token
    }) 
    return this.http.put<String>(`${this.URL}/edit-people/${listUser._id}`,listUser,{headers})
  }

}
