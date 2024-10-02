import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
  section: number = 2;
  verificationCode:string = '45826';
  code:string;

  constructor(private fb:FormBuilder, private router: Router,
    private notification: NzNotificationService,
    private _sanitizer: DomSanitizer,
    private auth:AuthService){
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
   /*  let user:User = {
      user_id: 7,
      username: 'xavi_yaq',
      email: 'xyanza@pentalab.tech',
      first_name: 'Xavier',
      last_name: 'Yanza'
    } 
    let response = {
      token: 'ssd52DS5F',
      user,
    }
      this.auth.setCredentials(response); */

      this.auth.login(username,password).subscribe({
        next:(response) => {
          this.verificationCode = String(response.data);
          console.log(this.verificationCode);
          
          this.section = 2;
          //this.auth.setCredentials(response.data);
          this.loading = false;
          //this.router.navigate(['/']);
        },error:() => this.loading = false
      })
  }

}
