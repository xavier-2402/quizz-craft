import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewConversation } from 'src/app/models/new-conversation';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit{

  user:User;
  constructor(private auth:AuthService, private readonly service:ConversationService, private readonly router:Router){

  }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }


  cards = [
    { title: 'Crea una diapositiva', icon: 'file-ppt', icon_class: 'icon-ppt', icon_type: 1 },
    { title: 'Crea un documento', icon: 'file-pdf', icon_class: 'icon-pdf', icon_type: 1 },
    { title: 'Crea un diagrama', icon: 'fa-solid fa-diagram-project', icon_class: 'icon-diagram', icon_type: 2 }
  ];

  handleMessage(message:string){
    let item:NewConversation = {
      tile:message,
      topic: message,
      message: message
    }
    this.service.newConversation(item).subscribe({
      next:(response)=>{
        this.router.navigate(['/chat', response.data.id])
      }
    })
    
  }
}
