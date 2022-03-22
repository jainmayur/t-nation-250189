import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TriviaContest } from '../../../../shared/trivia-contest';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class TriviaContestService {
  constructor(private http: HttpClient) {}

  getTriviaContest(code: string): Observable<TriviaContest | null> {
    const url = `${environment.api_url}/trivia/${code}`;

    return this.http.get<TriviaContest>(url).pipe(
      map((result: TriviaContest) => {
        if (result) {
          return result;
        } else {
          return null;
        }
      })
    );
  }

  getTriviaContestsByUserId(id: number): Observable<TriviaContest[]> {
    const url = `${environment.api_url}/triviaByUserId/${id}`;

    return this.http.get<TriviaContest[]>(url).pipe(
      map((result: TriviaContest[]) => {
        if (result) {
          return result;
        } else {
          return [];
        }
      })
    );
  }

  addContestForUser(userId: number, gameId:number): Observable<boolean> {
    const url = `${environment.api_url}/trivia/addContestForUser`;

    return this.http.post<boolean>(url, {userId:userId, gameId:gameId}).pipe(
      map((result: boolean) => {
        if (result) {
          return result;
        } else {
          return false;
        }
      })
    );
  }
}

