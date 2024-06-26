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
  public materials : Material[] = [];
  public counter : number = 0;
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
      this.srvMaterialSubject.get(10,this.subject).subscribe(subject => this.materials = subject);
      console.log(this.materials);
    
  }

}
