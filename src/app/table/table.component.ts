import { Component } from '@angular/core';
import { ServicePeopleService } from '../service-people.service';
import { People } from '../people';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  
  public RT : Array<People>;
  constructor(
    private peopleService: ServicePeopleService
    ){
      this.RT = new Array<People>();

  }


  showTable() {

  }


  ngOnInit(): void {
    this.peopleService.getPeople().subscribe(people => {
      this.RT = people;
      console.log(this.RT);
    })
  }

}

