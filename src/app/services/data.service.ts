import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Data[]> {
    return this.http.get<Data[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPostById(id: number): Observable<Data> {
    return this.http.get<Data>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  getToken(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('https://reqres.in/api/login', payload);
  }
}
