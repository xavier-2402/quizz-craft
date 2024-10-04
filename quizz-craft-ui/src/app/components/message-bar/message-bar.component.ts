import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.css']
})
export class MessageBarComponent implements OnChanges {

  userMessage: string = '';
  @Input()
  disable:boolean = false;
  chatMessages: { message: string, sender: string }[] = [];
  @Output()
  sendMessage = new EventEmitter<string>;
  @Input()
  isLoading:boolean = false;
  @Input()
  cleanMessage:boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
    }
  
  manageMessage() {
    if (this.userMessage.trim()) {
      this.sendMessage.emit(this.userMessage);
      this.userMessage = '';
    }
  }
}
