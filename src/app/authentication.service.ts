import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        console.log(`${environment.authUrl}login`, { email:username, password })
        return this.http.post<any>(`${environment.authUrl}login`, { email:username, password })
            .pipe(map(user => {
                this.saveUser(user)
                return user
            }));
    }

    signup(creditaion) {
        console.log('auth', creditaion)
        return this.http.post<any>(`${environment.authUrl}signup`, creditaion)
            .pipe(map(user => {
                this.saveUser(user)
                return user
            }));
    }

    saveUser(user) {
        // store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.currentUserSubject.next(user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}