import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../shared/user';
import { TriviaContest } from '../../../../shared/trivia-contest';
import { TriviaContestService } from '../services/trivia-contest-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  contests: TriviaContest[] = [];
  user: User | null; 
  code: string;
  contest: TriviaContest;
  codeIsInvalid: boolean;

  constructor(
    private route: ActivatedRoute,
    private triviaContestService: TriviaContestService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.getUser();
   
  }

  getUser():void{
    const getid = this.route.snapshot.paramMap.get('id');
    
    let id = 0;
    if(getid != null)
    {
      id = +getid
    }

    this.userService.getUser(id).subscribe(user => 
      {
        this.user = user;
        this.getTriviaContestsForUser();
      });
  }

  getTriviaContestsForUser(): void {

    if(this.user)
    {
       this.triviaContestService.getTriviaContests(this.user.triviaContests)
          .subscribe(contests => this.contests = contests);   
    }

  }

  validateTriviaContest(code: string): void {

    if(!this.code)
    {
        this.codeIsInvalid = true;
        return;
    }

    if(this.user)
    {
       this.triviaContestService.getTriviaContest(code)
          .subscribe(contest => 
            {
              this.contest = contest
              if(!this.contest)
              {
                this.codeIsInvalid = true;
                return;
              }
            });   
    } 

  }

  joinTriviaContest(): void{
    this.validateTriviaContest(this.code);
    this.user?.triviaContests.push(this.contest.id);
  }
}
