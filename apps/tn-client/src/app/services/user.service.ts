import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../../../shared/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User | null> {
    const url = `${environment.api_url}/users/${id}`;

    return this.http.get<User>(url).pipe(
      map((result: User) => {
        if (result) {
          return result;
        } else {
          return null;
        }
      })
    );
  }

  loginUser(username:string, password: string): Observable<User | null> {
    const url = `${environment.api_url}/users/login`;
    return this.http.post<User>(url, {username: username, password: password}).pipe(
      map((result: User) => {
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
