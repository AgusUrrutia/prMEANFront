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
  constructor(
    private peopleService: ServicePeopleService,
    private sessionService: SessionService
    ){
      this.RT = new Array<People>();
      sessionService.userLogin.subscribe(user => this.userLogin = user);
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

