import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TriviaContestService } from './services/trivia-contest-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameMapComponent } from './game-map/game-map.component';
//import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [AppComponent, UserDashboardComponent, LoginComponent, RegisterComponent, GameMapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, TriviaContestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
