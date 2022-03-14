import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CONTESTS } from '../../../../shared/mocks/mock-trivia-contests';
import { TriviaContest } from '../../../../shared/trivia-contest';

@Injectable({
  providedIn: 'root',
})

export class TriviaContestService {

  getTriviaContests(ids: number[]): Observable<TriviaContest[]> {
    const contests: TriviaContest[] = CONTESTS.filter(h => ids.includes(h.id));
    return of(contests);
  }
  getTriviaContest(code: string): Observable<TriviaContest> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const contest: TriviaContest = CONTESTS.find(h => h.code === code)!;
    return of(contest);
  }

  

}

