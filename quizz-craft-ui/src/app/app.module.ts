import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { IconsProviderModule } from './icons-provider.module';
import { HomeComponent } from './components/home/home.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageBarComponent } from './components/message-bar/message-bar.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { InterceptorService } from './core/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewChatComponent,
    ChatComponent,
    MessageBarComponent,
    LoginComponent,
    ForgetPasswordComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
