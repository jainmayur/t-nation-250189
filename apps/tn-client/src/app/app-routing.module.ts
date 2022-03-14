import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { GameMapComponent } from './game-map/game-map.component';

const routes: Routes =[
  {path: '', component: AppComponent, redirectTo:'login', pathMatch:'full'},
  {path: 'user-dashboard/:id', component: UserDashboardComponent},  
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'testMap', component:GameMapComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
