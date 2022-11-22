import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'projects/comments';
import { Observable } from 'rxjs';
import { endpoints } from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class CommentsHttpService {
  constructor(private http: HttpClient) {}

  public getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${endpoints.comments}?postId=${id}`);
  }
}
