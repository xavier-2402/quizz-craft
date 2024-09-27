import { Component } from '@angular/core';
import { Interaction } from 'src/app/models/interaction';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chatMessages: Interaction[] = [];
  isLoading:boolean = false;

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
}
