import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types';
import { endpoints } from './fake-server.endpoints';

@Injectable({
  providedIn: 'root',
})
export class FakeServerHttpService {
  constructor(private http: HttpClient) {}

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(endpoints.posts);
  }

  public getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${endpoints.posts}/${id}`);
  }
}
