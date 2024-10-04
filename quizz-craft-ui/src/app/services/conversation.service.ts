import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiIntegrations } from '../models/api-integrations';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(@Inject('BASE_URL') private baseUrl:string, private http:HttpClient) { }


  getConversationsByUser():Observable<any>{
    return this.http.get(`${this.baseUrl}api/${ApiIntegrations.CONVERSATION_API}/get-all-by-user`)
  }

  getInteractionsByConversationId(conversationId:string):Observable<any>{
    return this.http.get(`${this.baseUrl}api/${ApiIntegrations.CONVERSATION_API}/by/id/${conversationId}`)
  }
}
