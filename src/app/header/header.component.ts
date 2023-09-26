import { Component } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public userLogin:any;
  public role:any;
  constructor(private sessionService: SessionService){
    sessionService.userLogin.subscribe(user => this.userLogin = user);
    sessionService.userRole.subscribe(user => this.role = user);
  }

  logOut(){
    this.sessionService.logOut();
  }


  ngOnInit() {
    if(localStorage.getItem('nameUser') != null){
      this.userLogin = localStorage.getItem('nameUser');
      this.role = localStorage.getItem('role');
      console.log(this.userLogin);
    }
  }

}
