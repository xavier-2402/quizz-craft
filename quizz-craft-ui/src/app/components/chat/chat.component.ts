import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chatMessages: { message: string, sender: string }[] = [];

  sendMessage(message:string) {
    this.chatMessages.push({ message: message, sender: 'user' });
    this.getBotResponse(message);
  }

  getBotResponse(message: string) {
    // Simulando una respuesta del bot
    setTimeout(() => {
      const botMessage = `Bot: Respuesta al mensaje: "${message}"`;
      this.chatMessages.push({ message: botMessage, sender: 'bot' });
    }, 1000);
  }
}
