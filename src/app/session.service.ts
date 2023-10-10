import { Injectable } from '@angular/core';
import { Rt } from './rt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Storage,ref, listAll, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  public srcSession:BehaviorSubject<String| null> = new BehaviorSubject<String| null>("");
  public userLogin:BehaviorSubject<String| null> = new BehaviorSubject<String| null>("");
  public userRole:BehaviorSubject<String| null> = new BehaviorSubject<String| null>("");
  public msgErr:BehaviorSubject<String| null> = new BehaviorSubject<String| null>("");
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
    private router:Router,
    private storage: Storage
  ) {
   }

  logOut(){
    localStorage.clear();
    this.setULogin("");
    this.setURole("");
    this.redirect();
  }

  getDownloadURL(name:string){
    const fileRef = ref(this.storage,'images/'+name);
    getDownloadURL(fileRef).then(url => {
      this.setUSrcSession(url);
      localStorage.setItem('srcSession', url);
    })
    .catch(err=>console.log(err));
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
      this.getDownloadURL(this.token.data.nameUser);
      this.setURole(this.token.data.role);
      this.redirect();
    }
    if(rt.msg === "¡¡¡User invalid!!!"){
      this.setMsgErr("User");
    }
    if(rt.msg === "¡¡¡Password invalid!!!"){
      this.setMsgErr("Password");
    }
  }

  setUSrcSession(src:string | null){
    this.srcSession.next(src);
  }
  getSrcSession(){
    return this.srcSession.asObservable();
  }

  setMsgErr(msg:string | null){
    this.msgErr.next(msg)
  }
  getMsgErr(){
    return this.msgErr.asObservable();
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
