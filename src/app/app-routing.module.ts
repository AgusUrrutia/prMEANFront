import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { ErrPageComponent } from './err-page/err-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
{
  path: 'usuarios', 
  component:TableComponent, 
  canActivate:[AuthGuard], 
  data:{
    role:'Admin'
  }
},
{
  path: 'login', 
  component:LoginComponent
},
{
  path: 'register', 
  component:RegisterComponent
},
{
  path: '', 
  component:HomeComponent
},
{
  path: 'inicio', 
  component:HomeComponent
},
{
  path: '**', 
  component:ErrPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
