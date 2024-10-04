import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interaction } from 'src/app/models/interaction';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  chatMessages: Interaction[] = [];
  isLoading:boolean = false;
  id:string = '';

  constructor(private route:ActivatedRoute, private readonly service:ConversationService){
    
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInteractions();
  }

  sendMessage(message:string) {
    this.chatMessages.push({ message: message, sender: 'user' });
    this.getBotResponse(message);
  }

  getBotResponse(message: string) {
    // Simulando una respuesta del bot
    this.isLoading = true;
    setTimeout(() => {
      const botMessage = `Bot: Respuesta al mensaje: "${message}"`;
      this.chatMessages.push({ message: botMessage, sender: 'bot' });
      this.isLoading = false;
    }, 5000);
  }

  getInteractions(){
    this.service.getInteractionsByConversationId(this.id).subscribe({
      next:(response)=>{
        console.log(response);
        this.chatMessages = response.data;
      }
    })
  }
}
