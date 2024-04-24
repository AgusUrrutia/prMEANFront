import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceMaterialSubjectService } from '../service-material-subject.service';
import { Material } from '../material';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  private materials : any;
  constructor( 
    private route: ActivatedRoute,
    private srvMaterialSubject : ServiceMaterialSubjectService
  ){
    subject : String;
    
  }
  subject = 'subject';
  ngOnInit() {
    
      const id = this.route.snapshot.params['subject'];
      this.subject = id;
      console.log(id);
      this.materials = this.srvMaterialSubject.get(10,this.subject).subscribe(subject => console.log(subject));
      console.log(this.materials);
    
  }

}
