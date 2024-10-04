import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NewUser } from '../models/new-user';
import { Observable } from 'rxjs';
import { ApiIntegrations } from '../models/api-integrations';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('BASE_URL') private baseUrl:string, private http:HttpClient) { }

  addUser(user:NewUser):Observable<any>{
    return this.http.post(`${this.baseUrl}api/${ApiIntegrations.USER_API}/save`,user);
  }
}
