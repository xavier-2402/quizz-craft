import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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

  logo:string = '../../../assets/images/no-image.png';
  form:UntypedFormGroup; 
  passwordVisible = false; 
  password?: string;
  loading:boolean = false;

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
      /* this.auth.login(username,password).subscribe({
        next:(response) => {
          this.auth.setCredentials(response.data);
          this.loading = false;
          this.router.navigate(['/']);
        },error:() => this.loading = false
      }) */
      this.loading = false;
      this.router.navigate(['/']);
  }

}