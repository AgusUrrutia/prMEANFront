import { Injectable } from '@angular/core';
import { Rt } from './rt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  
  public userLogin:BehaviorSubject<String| null> = new BehaviorSubject<String| null>("");
  public userRole:BehaviorSubject<String| null> = new BehaviorSubject<String| null>("");

  public tock:BehaviorSubject<Rt> = new BehaviorSubject<Rt>({
    data: {
      email: '',
      nameUser: '',
      password: '',
      role: '',
      _id: ''
    },
    msg: '',
    status: '',
    token: ''
  });

  public token: Rt = {
    data: {
      email: '',
      nameUser: '',
      password: '',
      role: '',
      _id: ''
    },
    msg: '',
    status: '',
    token: ''
  };
  constructor(
    private router:Router
  ) {
   }

  logOut(){
    localStorage.clear();
    this.setULogin("");
    this.setURole("");
    this.redirect();
  }


  redirect(){
    this.router.navigate(['/inicio']);
  }

  setToken(rt:Rt | any){
    if(rt.status === 200){
      this.token = rt;
      console.log(rt);
      console.log(this.tock);
      localStorage.setItem('token', this.token.token);
      localStorage.setItem('nameUser', this.token.data.nameUser);
      localStorage.setItem('role', this.token.data.role);
      this.setULogin(this.token.data.nameUser);
      this.setURole(this.token.data.role);
      this.redirect();
    }
  }


  setURole(userRole:string | null){
    this.userRole.next(userRole)
  }

  setULogin(userLogin:string | null){
    this.userLogin.next(userLogin)
  }

  getULogin(){
    return this.userLogin.asObservable();
  }

  getUserRole(){ 
    return localStorage.getItem('role');
  }
}
