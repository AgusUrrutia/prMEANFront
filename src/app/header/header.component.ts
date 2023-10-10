import { Component } from '@angular/core';
import { SessionService } from '../session.service';
import { Storage,ref, listAll, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public srcSession:any;
  public userLogin:any;
  public role:any;
  constructor(
    private sessionService: SessionService,
    
    ){
    sessionService.userLogin.subscribe(user => this.userLogin = user);
    sessionService.userRole.subscribe(user => this.role = user);
    sessionService.srcSession.subscribe(srcSession => this.srcSession = srcSession);
  }

  logOut(){
    this.sessionService.logOut();
  }

  
  
  ngOnInit() {
    if(localStorage.getItem('nameUser') != null){
      this.userLogin = localStorage.getItem('nameUser');
      this.role = localStorage.getItem('role');
      this.srcSession = localStorage.getItem('srcSession');
      console.log(localStorage.getItem('srcSession'));
      
      console.log(this.userLogin);
    }
  }

}
