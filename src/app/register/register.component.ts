import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicePeopleService } from '../service-people.service';
import { SessionService } from '../session.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  public listUser:any;
  constructor( 
    private peopleService: ServicePeopleService,
    private sessionService: SessionService
    ){

    this.listUser = {
      nameUser:null,
      password:null,
      email:null,
      role:'user'
    }
  }



  register(f:NgForm){
    console.log("Envio del formulario");
    this.peopleService.register(this.listUser).subscribe(rt=> this.sessionService.setToken(rt));
    this.sessionService.setULogin(localStorage.getItem('nameUser'));
  }

  ngOnInit(){
    if(localStorage.length != 0){
      this.sessionService.setULogin(localStorage.getItem('nameUser'));
    }
  }


}
