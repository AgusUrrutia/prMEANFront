import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicePeopleService } from '../service-people.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public listUser:any;

  constructor( private peopleService: ServicePeopleService){
    this.listUser = {
      nombre:null,
      apellido:null,
    }
  }

  saveUser(f:NgForm){
    console.log("Envio del formulario");
    this.peopleService.sendUser(this.listUser).subscribe(rt=> console.log(rt));
  }


}
