import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Todo {
  id: number;
  taskName: string;
  taskStatus: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private apiUrl = 'http://localhost:3000/todo';

  private loginApi = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  loginUser(userData: any): Observable<any>{
       return this.http.post<any>(this.loginApi, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }


  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }


  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}