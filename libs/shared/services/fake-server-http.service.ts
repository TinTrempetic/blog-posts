import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'libs/users/types';
import { Observable } from 'rxjs';
import { Post } from '../../blog-posts/types';
import { Comment } from '../../comments/types';
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

  public getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${endpoints.comments}?postId=${id}`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpoints.users);
  }
}
