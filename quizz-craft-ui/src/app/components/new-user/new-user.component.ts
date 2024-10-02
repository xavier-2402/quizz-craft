import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Question } from 'src/app/models/question';
import { RegularExpressions } from 'src/app/models/regular-expressions';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  form:UntypedFormGroup;
  passwordForm:UntypedFormGroup;
  section: number = 1;
  passwordVisible:boolean = false;
  secondPasswordVisible:boolean =false;
  securityQuestions:Question[] = []
  constructor(private fb:UntypedFormBuilder, private msg:NzMessageService){
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      first_name:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(RegularExpressions.REG_EXP_LETTERS)]],
      last_name:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(RegularExpressions.REG_EXP_LETTERS)]],
      email:[null,[Validators.pattern(RegularExpressions.REG_EXP_EMAIL)]]
    }); 

    this.passwordForm = this.fb.group({
      username:[null,[Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(/(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)|(^[a-zA-Z0-9]{3,20}$)/)]],
      password:[null,[Validators.required, Validators.minLength(8), Validators.maxLength(70), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      secondPassword:[null,[Validators.required, Validators.minLength(8), Validators.maxLength(70),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
    });
  }


  verifyInitData(){
    if(!this.form.valid){
      this.msg.warning('Ingrese la información necesaria');
      return;
    }
    this.section = 2;

  }

  verifyPasswords(){
    if(!this.passwordForm.valid){
      this.msg.warning('Ingrese la información correcta');
      return;
    }
    let password = this.passwordForm.get('password').value;
    let secondPassword = this.passwordForm.get('secondPassword').value;
    if(password != secondPassword){
      this.msg.warning('Las contraseñas no coinciden')
      return;
    }
    this.section = 3;
  }

  next(){
    if(this.section == 1){
      this.verifyInitData();
      return;
    }
    if(this.section == 2){
      this.verifyPasswords();
      return;
    }
  }

  verifyAnswers():boolean{
    if(this.securityQuestions.filter(x => x.answer == null).length > 0){
      this.msg.warning('Ingrese todos los valores')
      return false;
    }
    return false;
  }

  saveUser(){
    console.log(this.verifyAnswers());
    
  }
}
