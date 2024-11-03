import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NewUser } from '../models/new-user';
import { Observable } from 'rxjs';
import { ApiIntegrations } from '../models/api-integrations';
import { UserQuestionDto } from '../models/user-question-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('BASE_URL') private baseUrl:string, private http:HttpClient) { }

  addUser(user:NewUser):Observable<any>{
    return this.http.post(`${this.baseUrl}api/${ApiIntegrations.USER_API}/save`,user);
  }

  remember(username:string):Observable<any>{
    return this.http.get(`${this.baseUrl}api/${ApiIntegrations.USER_API}/remember/${username}`);
  }

  verifyAnswers(item: UserQuestionDto):Observable<any>{
    return this.http.post(`${this.baseUrl}api/${ApiIntegrations.USER_API}/remember/result`,item);
  }

  updatePassword(user:User):Observable<any>{
    return this.http.patch(`${this.baseUrl}api/${ApiIntegrations.USER_API}/update-password`,user);
  }
}
