import { Component, OnInit } from '@angular/core';
import { UserService } from 'apps/tn-server/src/app/services/user.service';

type Link = {
  /** The Angular router path */
  url: string[];

  /** The name to display in the navbar */
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  /** Title of the app */
  public title = 'Trivia Nation';
  isTeacher : number;

  constructor(private userService : UserService){
    
  }
  ngOnInit(): void {
    this.isTeacher = this.userService.isTeacher;
  }

  /** Links in the navbar */
  public links: Link[] = [
    {
      name: 'Home',
      url: [''],
    },
    {
      name: 'Questions Bank',
      url: ['addquestions'],
    }
  ];
}
