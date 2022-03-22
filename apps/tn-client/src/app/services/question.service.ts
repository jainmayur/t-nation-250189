import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Question } from '../../../../shared/question';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {}

  addQuestion(question: string, correctAnswer: string, otherAnswersJSON: string): Observable<Question | null> {
    const url = `${environment.api_url}/trivia/addquestion`;
    return this.http.post<Question>(url, {question: question, correctAnswer: correctAnswer, otherAnswersJSON: otherAnswersJSON}).pipe(
      map((result: Question) => {
        if (result) {
          console.log(result);
          return result;
        } else {
          return null;
        }
      })
    );
  }

}
