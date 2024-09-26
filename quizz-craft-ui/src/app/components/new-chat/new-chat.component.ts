import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit{

  user:User;
  constructor(private auth:AuthService){

  }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }


  cards = [
    { title: 'Crea una diapositiva', icon: 'file-ppt', icon_class: 'icon-ppt', icon_type: 1 },
    { title: 'Crea un documento', icon: 'file-pdf', icon_class: 'icon-pdf', icon_type: 1 },
    { title: 'Crea un diagrama', icon: 'fa-solid fa-diagram-project', icon_class: 'icon-diagram', icon_type: 2 }
  ];
}
