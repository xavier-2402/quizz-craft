import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  title: string = '';
  section: number = 1;
  securityQuestions:any[] = [
    {
      title:'¿Cuál es el nombre de su mascota?',
      answer: null
    },
    {
      title:'¿Cuál es su bebida favorita?',
      answer: null
    }
  ]

  constructor(private msg: NzMessageService){

  }

  verifyAnswers(){
    if(this.securityQuestions.filter(x => x.answer == null).length > 0){
      this.msg.warning('Ingrese todos los valores')
      return;
    }
  }
}
