import { Component } from '@angular/core';

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
export class AppComponent {
  /** Title of the app */
  public title = 'Trivia Nation';

  /** Links in the navbar */
  public links: Link[] = [
    {
      name: 'Home',
      url: [''],
    },
    {
      name: 'Add Questions',
      url: ['addquestion'],
    }
  ];
}
