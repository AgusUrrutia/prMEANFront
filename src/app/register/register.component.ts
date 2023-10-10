import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicePeopleService } from '../service-people.service';
import { SessionService } from '../session.service';
import{Storage, ref, uploadBytes} from '@angular/fire/storage'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private img: any;
  public listUser:any;
  constructor(
    private storage:Storage,
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

  uploadImage($event : any){
    this.img = $event.target.files[0];
   
  }

  renameFile(file: File, newName: string): File {
    // Crear un nuevo Blob con el mismo contenido del archivo original.
    const blob = file.slice(0, file.size, file.type);
  
    // Crear un nuevo objeto File con el Blob y el nuevo nombre.
    return new File([blob], newName, { type: file.type, lastModified: Date.now() });
  }



  register(f:NgForm){
    console.log("Envio del formulario");
    this.peopleService.register(this.listUser).subscribe(rt=> this.sessionService.setToken(rt));
    this.sessionService.setULogin(localStorage.getItem('nameUser'));


    // Envio de imagen a firebase Storage
    console.log(f.form.controls['nameUser'].value);
    let name = f.form.controls['nameUser'].value;
    
    this.img = this.renameFile(this.img,name);
    console.log(this.img.name);
    
    const imgRef = ref(this.storage, `images/${this.img.name}`);
    uploadBytes(imgRef,this.img)
    .then(response => console.log(response))
    .catch(err=>console.log(err))
  }

  ngOnInit(){
    if(localStorage.length != 0){
      this.sessionService.setULogin(localStorage.getItem('nameUser'));
    }
  }


}
