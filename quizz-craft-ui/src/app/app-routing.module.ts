import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NewUserComponent } from './components/new-user/new-user.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent, children:[
      { path:'',component:NewChatComponent },
      { path:'chat',component:ChatComponent }
    ]
  },
  { path: 'login', component:LoginComponent },
  { path: 'forget-password', component:ForgetPasswordComponent },
  { path: 'new-user', component:NewUserComponent },
  { path: '**', component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
