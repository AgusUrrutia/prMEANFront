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

  constructor( 
    private peopleService: ServicePeopleService,
    private sessionService: SessionService
    ){
    this.listUser = {
      nameUser:null,
      password:null,
    }
  }

  login(f:NgForm){
    console.log("Envio del formulario");
    this.peopleService.login(this.listUser).subscribe(rt=> 
        this.sessionService.setToken(rt)
    );
    this.sessionService.setULogin(localStorage.getItem('nameUser'));
  }

  ngOnInit(){
    if(localStorage.length != 0){
      this.sessionService.setULogin(localStorage.getItem('nameUser'));
    }
  }
}
