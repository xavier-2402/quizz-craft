import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent, children:[
      {path:'new-chat',component:NewChatComponent},
      {path:'chat',component:ChatComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
