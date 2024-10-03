import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  token: string;
  constructor(@Inject('BASE_URL') private baseUrl:string, private http:HttpClient, private router:Router) { }

  login(username:string, password: string):Observable<any>{
    let login = {
      username,
      password
    }
    return this.http.post(`${this.baseUrl}api/user/login`, login);
  }

  verificate(username:string, password: string, code:number):Observable<any>{
    let login = {
      username,
      password,
      code
    }
    return this.http.post(`${this.baseUrl}api/user/verificate`, login)
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("data");
    localStorage.removeItem("tk");
    this.router.navigate(['/login']);
  }

  setCredentials(credentials: any) {
    localStorage.setItem("data", JSON.stringify(credentials.user));
    localStorage.setItem("tk", credentials.token);
    this.getCredentials();
  }

  getCredentials() {
    let user = localStorage.getItem("data");
    let token = localStorage.getItem("tk");

    if (!user || !token) {
      this.user = null;
    } else {
      this.user = JSON.parse(user);
      this.token = token;
    }
  }

  getUser():User{
    let user = localStorage.getItem("data");
    return JSON.parse(user);
  }

  
  isLogin(): Observable<any> {
    return of({ authenticated: this.user && this.token ? true : false });
  }

}
