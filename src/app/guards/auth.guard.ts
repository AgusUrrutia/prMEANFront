import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { SessionService } from '../session.service';
import { Rt } from '../rt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private sessionService: SessionService,
    private router: Router
    ){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route);
  }


  checkUserLogin(route: ActivatedRouteSnapshot):boolean{
    const userData = this.sessionService.getUserRole();
    console.log(this.sessionService.getUserRole());
    

    if(userData === route.data['role']){
      return true;
    }else{
      this.router.navigate(['/','**'])
      return false
    }

  }
  
}
