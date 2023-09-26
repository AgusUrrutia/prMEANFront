import { Component, OnInit, ElementRef } from "@angular/core";
import { SessionService } from "./session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'prmeanfront';
  private userLogin:any;
  constructor(private sessionService: SessionService){
    this.userLogin = this.sessionService.userLogin;
  }
}
