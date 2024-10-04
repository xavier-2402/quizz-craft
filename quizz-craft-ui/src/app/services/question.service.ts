import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiIntegrations } from '../models/api-integrations';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(@Inject('BASE_URL') private baseUrl:string, private http:HttpClient) { }

  getQuestions():Observable<any>{
    return this.http.get(`${this.baseUrl}api/${ApiIntegrations.QUESTION_API}/all`)
  }
}
