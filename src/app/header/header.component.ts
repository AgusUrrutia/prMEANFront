import { Component } from '@angular/core';
import { SessionService } from '../session.service';
import { ServicePeopleService } from '../service-people.service';
import { NgForm } from '@angular/forms';
import { People } from '../people';
import{Storage, ref, uploadBytes} from '@angular/fire/storage'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public srcSession:any;
  public userLogin:any;
  public role:any;
  public editU:boolean = false;
  public loader: boolean = false;
  public listUser:any;
  private img: any;
  public userEdit: People | null = {
    nameUser : "",
    password: "",
    _id: "",
    role: "",
    email: ""
  };
  public editForm: boolean = false;
  private choseImage: boolean = false;
  constructor(
    private sessionService: SessionService,
    private peopleService: ServicePeopleService,
    private storage: Storage
    
    ){
    sessionService.userLogin.subscribe(user => this.userLogin = user);
    sessionService.userRole.subscribe(user => this.role = user);
    sessionService.srcSession.subscribe(srcSession => this.srcSession = srcSession);
    this.listUser = {
      nameUser:null,
      password:null,
    }
  }

  logOut(){
    this.sessionService.logOut();
  }

  editUser(){
    if(this.editU === false){
      this.editU = true;
    }else{
      this.editU = false;
    }
  }
  renameFile(file: File, newName: string): File {
    // Crear un nuevo Blob con el mismo contenido del archivo original.
    const blob = file.slice(0, file.size, file.type);
  
    // Crear un nuevo objeto File con el Blob y el nuevo nombre.
    return new File([blob], newName, { type: file.type, lastModified: Date.now() });
  }
  uploadImage($event : any){
    this.img = $event.target.files[0];
    this.choseImage = true;
  }
  upload(e:NgForm){
    console.log(this.userEdit);
    
    if(this.userEdit != null){
      this.peopleService.editUser(this.userEdit).subscribe((rt)=>{ 
        this.sessionService.setToken(rt)
        console.log(rt)
      });
      this.sessionService.setULogin(localStorage.getItem('nameUser'));
      if(this.choseImage){
        let name = e.form.controls['nameUser'].value;
      
        this.img = this.renameFile(this.img,name);
        console.log(this.img.name);
        
        const imgRef = ref(this.storage, `images/${this.img.name}`);
        uploadBytes(imgRef,this.img)
        .then(response => console.log(response))
        .catch(err=>console.log(err))
      }
    }
  }

  reqUser(f:NgForm){
    // this.listUser.password = f.controls[0];
    this.listUser.nameUser = this.userLogin;
    console.log("Envio del formulario");
    console.log(this.listUser.nameUser);
    console.log(this.listUser.password);
    // this.msgErr = "";
    this.loader = true;
    this.peopleService.login(this.listUser).subscribe((rt)=>{
      this.userEdit = this.sessionService.getUser(rt);
      if(this.userEdit){
        this.editU = false;
        this.loader = false;
        this.editForm = true;
      }
      console.log(rt);
    });
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
