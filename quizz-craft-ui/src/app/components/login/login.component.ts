import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RegularExpressions } from 'src/app/models/regular-expressions';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  array:any[]=[
    {img:'../../../assets/login/login1.svg'},
    {img:'../../../assets/login/login2.svg'}
  ]

  form:UntypedFormGroup; 
  passwordVisible = false; 
  password?: string;
  loading:boolean = false;
  section: number = 1;
  verificationCode:string;
  code:string;
  isCodeValid:boolean = true;

  constructor(private fb:FormBuilder, private router: Router,
    private notification: NzNotificationService,
    private _sanitizer: DomSanitizer,
    private auth:AuthService,
    private msg:NzMessageService){
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.array.forEach(x=>{
      x['urlsafe'] = this._sanitizer.bypassSecurityTrustResourceUrl(x.img);
    });
  }

  createNotification(type: string, tittle: string, message: string): void {
    this.notification.create(
      type,
      tittle,
      message,
      { nzPlacement: 'bottomLeft' }
    );
  }

  
  submitForm(){
    if(!this.form.valid){
      this.createNotification('warning', 'Ingrese datos validos', '');
      return;

    }
    this.loading = true;
    let username = this.form.get('username').value;
    let password = this.form.get('password').value;

      this.auth.login(username,password).subscribe({
        next:(response) => {
          this.verificationCode = String(response.data);
          this.section = 2;
          this.loading = false;
        },error:() => this.loading = false
      })
  }

  validateCode(){
    if( !this.code || this.code.length != 5){
      this.isCodeValid = false;
      return;
    }
    if(!RegularExpressions.REG_EXP_NUMBERS.test(this.code)){
      this.isCodeValid = false;
      this.msg.error('Código incorrecto');
      return;
    }

    if(this.code != this.verificationCode){
      this.isCodeValid = false;
      this.msg.error('Código incorrecto');
      return;
    }
    this.isCodeValid = true;

    let username = this.form.get('username').value;
    let password = this.form.get('password').value;
    this.auth.verificate(username,password,Number(this.code)).subscribe({
      next:(response)=>{
        this.auth.setCredentials(response.data);
        console.log(response);
        
        this.router.navigate(['/']);
      },error:() => this.msg.error('Información incorrecta')
    })
  }

}
