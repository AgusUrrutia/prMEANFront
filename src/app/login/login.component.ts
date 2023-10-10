import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicePeopleService } from '../service-people.service';
import { SessionService } from '../session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public listUser:any;
  private userLogin:any;
  private token:Object | undefined;
  public msgErr:any;
  public loader:boolean;
  constructor( 
    private peopleService: ServicePeopleService,
    private sessionService: SessionService
    ){
    this.loader = false;
    this.listUser = {
      nameUser:null,
      password:null,
    }
    this.sessionService.getMsgErr().subscribe(msg => this.msgErr = msg);
  }

  login(f:NgForm){
    console.log("Envio del formulario");
    this.msgErr = "";
    this.loader = true;
    this.peopleService.login(this.listUser).subscribe(rt=> 
        this.sessionService.setToken(rt)
    );
  }

  ngOnInit(){
    if(localStorage.length != 0){
      this.sessionService.setULogin(localStorage.getItem('nameUser'));
    }
  }
}
