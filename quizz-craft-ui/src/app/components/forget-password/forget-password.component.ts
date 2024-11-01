import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
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

  password:string = null;
  secondPassword:string = null;
  passwordVisible: boolean = false;
  secondPasswordVisible: boolean = false;
  array:any[]=[];
  username: string;

  constructor(private msg: NzMessageService,
    private readonly settings: SettingsService,
    private _sanitizer: DomSanitizer){
    this.array = this.settings.getImagesCarrousel();
  }
  ngOnInit(): void {
    this.array.forEach(x=>{
      x['urlsafe'] = this._sanitizer.bypassSecurityTrustResourceUrl(x.img);
    });
  }

  verifyuser(){
    if(!this.username){
      this.msg.warning('Ingrese un nombre de usuario');
      return;
    }
    this.section = 2;
  }

  verifyAnswers(){
    if(this.securityQuestions.filter(x => x.answer == null).length > 0){
      this.msg.warning('Ingrese todos los valores')
      return;
    }
    this.section = 3;
  }

  isValid():boolean{
    if(this.password == null) return false;
    if(this.secondPassword == null) return false;
    return this.password == this.secondPassword;
  }

  updatePassword(){
    this.section = 4;
  }
}
