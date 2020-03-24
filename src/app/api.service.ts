import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';
import { Observable, throwError } from 'rxjs';
import {catchError, delay} from 'rxjs/operators'
import { User } from './user';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl+'todo';

@Injectable()
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http
    .get<User[]>(environment.apiUrl+'users')
      .pipe(
        catchError(error => {
          console.log('Error: ', error.message)
          return throwError(error)
        })
      )
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http
    .get<Todo[]>(API_URL)
      .pipe(
        catchError(error => {
          console.log('Error: ', error.message)
          return throwError(error)
        })
      )
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http
    .post<Todo>(API_URL, todo, this.httpOptions)
  }

  deleteTodoById(id: number): Observable<void> {
    return this.http.delete<void>(API_URL+`/${id}`)
  }

  completeTodo(id: number): Observable<Todo> {
    return this.http.put<Todo>(API_URL+`/${id}`, {
      completed: true
    })
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get<Todo>(API_URL + '/todos/' + todoId);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(API_URL + '/' + todo._id, todo)
  }

} 