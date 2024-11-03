import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { QuestionUser } from 'src/app/models/question-user';
import { User } from 'src/app/models/user';
import { UserQuestionDto } from 'src/app/models/user-question-dto';
import { SettingsService } from 'src/app/services/settings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  title: string = '';
  section: number = 1;
  securityQuestions:QuestionUser[] = [];

  password:string = null;
  secondPassword:string = null;
  passwordVisible: boolean = false;
  secondPasswordVisible: boolean = false;
  array:any[]=[];
  username: string;
  userFinded: UserQuestionDto;
  showVerify: boolean = false;
  form:UntypedFormGroup;
  isValid:boolean = false;

  constructor(private msg: NzMessageService,
    private readonly settings: SettingsService,
    private _sanitizer: DomSanitizer,
    private userService: UserService, 
    private fb:FormBuilder){
    this.array = this.settings.getImagesCarrousel();
    this.form = this.fb.group({
      password: [null,[Validators.required]],
      second_password: [null,[Validators.required]]
    })
  }


  ngOnInit(): void {
    this.array.forEach(x=>{
      x['urlsafe'] = this._sanitizer.bypassSecurityTrustResourceUrl(x.img);
    });

    this.form.valueChanges.subscribe({
      next:()=>{
        if(!this.form.valid){ 
          this.isValid = false;
          return;
        }
        this.password = this.form.get('password')?.value;
        this.secondPassword = this.form.get('second_password')?.value;

        this.isValid = this.password == this.secondPassword;
      }
    })
  }

  verifyuser(){
    if(!this.username){
      this.msg.warning('Ingrese un nombre de usuario');
      return;
    }
    this.rememberUser(true);
  }

  verifyAnswers(){
    if(this.securityQuestions.filter(x => x.response == null).length > 0){
      this.msg.warning('Ingrese todos los valores')
      return;
    }
    this.userService.verifyAnswers(this.userFinded).subscribe({
      next:(response)=> {
        if(!response.data){
          this.msg.error('Información Incorrecta');
          return;
        }
        this.section = 3;
      }
    })
  }


  updatePassword(){
    const user: User = {
      user_id: this.userFinded.userId,
      id: this.userFinded.id,
      username: this.userFinded.username,
      password_hash: this.password
    }
    this.userService.updatePassword(user).subscribe({
      next:()=>{
        this.msg.success('Contraseña actualizada');
        this.section = 4;
      }
    })
  }

  rememberUser(manageSection:boolean = false){
    this.userService.remember(this.username).subscribe({
      next:(response)=>{
        this.userFinded = response.data;
        if(this.userFinded == null) this.msg.error('No se encontró un usuario registrado');
        this.securityQuestions = this.userFinded.questions;
        if(manageSection) this.section = 2;

      },error:(err)=>{
        if( err.error && err.error.message){
          this.msg.error(err.error.message)
          return;
        }
        this.msg.error('Ocurrió un error al buscar al usuario')
      }
    })
  }

  manageAnswers(){
    if(this.securityQuestions.filter(x => x.response == null).length == 0){
      this.showVerify = true;
      return;
    }
    this.showVerify = false;
  }
}
