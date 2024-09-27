import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.css']
})
export class MessageBarComponent {
  userMessage: string = '';
  chatMessages: { message: string, sender: string }[] = [];
  @Output()
  sendMessage = new EventEmitter<string>;
  @Input()
  isLoading:boolean = false;
  
  manageMessage() {
    if (this.userMessage.trim()) {
      this.sendMessage.emit(this.userMessage);
      this.userMessage = '';
    }
  }
}
