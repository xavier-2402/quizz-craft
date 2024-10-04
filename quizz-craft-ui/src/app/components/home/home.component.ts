import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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

  constructor(private auth:AuthService, private conversationService:ConversationService, private route:ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {    
    this.user = this.auth.getUser();
    this.getConversations();
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      let parts:string[] = event.url.split('/');
      if(parts.length == 3){
        if(parts[1] == 'chat'){
          if(this.conversations.find(x => x.id == parts[3]) == null){
            this.getConversations();
          }
        }
      }
    });
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
