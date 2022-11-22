import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'projects/users';
import { Observable } from 'rxjs';
import { endpoints } from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpoints.users);
  }
}
