import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';

const routes: Routes = [
  {path:'',component:HomeComponent,children:[
    {path:'', component:NewChatComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
