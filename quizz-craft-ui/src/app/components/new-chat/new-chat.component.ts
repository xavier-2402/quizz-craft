import { Component } from '@angular/core';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent {

  cards = [
    { title: 'Crea una diapositiva', icon: 'file-ppt', icon_class: 'icon-ppt', icon_type: 1 },
    { title: 'Crea un resumen', icon: 'file-pdf', icon_class: 'icon-pdf', icon_type: 1 },
    { title: 'Crea un diagrama', icon: 'fa-solid fa-diagram-project', icon_class: 'icon-diagram', icon_type: 2 }
  ];
}
