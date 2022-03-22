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
  contest: TriviaContest | null;
  codeIsInvalid: boolean;
  userHasCode: boolean;

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
       this.triviaContestService.getTriviaContestsByUserId(this.user.userID)
          .subscribe(contests => this.contests = contests);   
    }

  }

  joinTriviaContest(): void {

    const codeToAdd  = this.code.trim();
    if(codeToAdd === "")
    {
        this.codeIsInvalid = true;
        return;
    }

    if(this.user)
    {
      if(this.contests.find(x=> x.code = codeToAdd))
      {
        this.userHasCode = true;   
      }

       this.triviaContestService.getTriviaContest(codeToAdd)
          .subscribe(contest => 
            {
              this.contest = contest
              if(!this.contest)
              {
                this.codeIsInvalid = true;
              }else{
           
                this.contests.push(this.contest);
                this.user?.triviaContests.push(codeToAdd);
                if(this.user)
                {
                  this.addContestForUser(this.user.userID, this.contest.gameID);
                }
              }
            });   
    } 

  }

  addContestForUser(userId: number, gameId:number): boolean
  {
    this.triviaContestService.addContestForUser(userId, gameId)
    .subscribe(result => 
      {
        if(result == false)
        {
          //todo add error         
        }
        return result;
      });   
      return false;
  }
}
