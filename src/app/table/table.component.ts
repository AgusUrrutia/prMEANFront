import { Component } from '@angular/core';
import { ServicePeopleService } from '../service-people.service';
import { People } from '../people';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  
  public RT : Array<People>;
  public userLogin:any;
  public listUser:any;
  constructor(
    private peopleService: ServicePeopleService,
    private sessionService: SessionService
    ){
      this.RT = new Array<People>();
      sessionService.userLogin.subscribe(user => this.userLogin = user);
      this.listUser = {
        _id:null,
        nameUser:null,
        password:null
      }
  }


  completeEdit(id: string){
    let people = this.RT.find(p => p._id === id);
    this.listUser = people;
  }
  editUser(listUser: People){
    
    this.peopleService.editUser(listUser).subscribe((res)=> {  
      console.log(res);
      this.RT = this.RT.filter(peo => peo._id !== listUser._id);
      this.RT.push(listUser);
    })
  }

  deleteUser(id: string){
    let people = this.RT.find(p => p._id === id);
    this.peopleService.deleteUser(id).subscribe((res)=> {  
      console.log(res);
      this.RT = this.RT.filter(peo => peo._id !== id);
      if(people != undefined){
        this.peopleService.deleteImage(people.nameUser);
      }
    });
  }
  

  ngOnInit(): void {
    if(localStorage.getItem('nameUser') != null){
      this.userLogin = localStorage.getItem('nameUser');
    }

    this.peopleService.getPeople().subscribe(people => {
      this.RT = people;
    })

  }

}

