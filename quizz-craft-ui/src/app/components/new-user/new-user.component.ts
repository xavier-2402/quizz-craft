import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NewUser } from 'src/app/models/new-user';
import { Question } from 'src/app/models/question';
import { QuestionUser } from 'src/app/models/question-user';
import { RegularExpressions } from 'src/app/models/regular-expressions';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit{

  form:UntypedFormGroup;
  passwordForm:UntypedFormGroup;
  section: number = 1;
  passwordVisible:boolean = false;
  secondPasswordVisible:boolean =false;
  securityQuestions:Question[] = [];
  enableSave:boolean = false;
  constructor(private fb:UntypedFormBuilder, private msg:NzMessageService, private readonly questionService:QuestionService,
    private readonly userService:UserService
  ){
    this.buildForm();
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  buildForm(){
    this.form = this.fb.group({
      first_name:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(RegularExpressions.REG_EXP_LETTERS)]],
      last_name:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(70), Validators.pattern(RegularExpressions.REG_EXP_LETTERS)]],
      email:[null,[Validators.pattern(RegularExpressions.REG_EXP_EMAIL)]]
    }); 

    this.passwordForm = this.fb.group({
      username:[null,[Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(RegularExpressions.REG_EXP_USER)]],
      password:[null,[Validators.required, Validators.minLength(8), Validators.maxLength(70), Validators.pattern(RegularExpressions.REG_EXP_PASSWORD)]],
      secondPassword:[null,[Validators.required, Validators.minLength(8), Validators.maxLength(70),Validators.pattern(RegularExpressions.REG_EXP_PASSWORD)]],
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
    if(!this.form.valid || !this.passwordForm.valid){
      this.msg.warning('Ingrese la información necesaria');
    }

    if(this.securityQuestions.filter(x => x.answer).length < 3){
      this.msg.warning('Responda al menos 3 preguntas');
      return;
    }

    let questions: QuestionUser[] = []
    for (const question of this.securityQuestions.filter(x => x.answer)) {
      questions.push({code:question.question_id, question: question.name, response: question.answer})
    }

    let user:NewUser={
      username: this.passwordForm.get('username').value,
      password: this.passwordForm.get('password').value,
      first_name: this.form.get('first_name').value,
      last_name: this.form.get('last_name').value,
      email: this.form.get('email').value,
      questions
    }

    this.userService.addUser(user).subscribe({
      next:()=>{
        this.section = 4;
      }
    })

  }

  validateQuestions(){
    this.enableSave = this.securityQuestions.filter(x => x.answer).length >= 3
  }

  getQuestions(){
    this.securityQuestions = [];
    this.questionService.getQuestions().subscribe({
      next:(response)=>{
        this.securityQuestions = response.data;
      }
    })
  }
}
