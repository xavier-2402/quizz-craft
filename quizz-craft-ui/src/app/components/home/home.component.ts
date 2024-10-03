import { Component, HostListener, OnInit } from '@angular/core';
import { Conversation } from 'src/app/models/conversation';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showSidebar:boolean = true;
  user:User;
  isMobile: boolean = false;
  conversations:Conversation[] = [];
  constructor(private auth:AuthService, private conversationService:ConversationService){

  }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.getConversations();
  }

  close(){
    this.showSidebar = false;
  }

  getConversations(){
    this.conversations = [];
    this.conversationService.getConversationsByUser().subscribe({
      next:(response)=>{
        this.conversations = response.data;
      }
    })
  }

}
